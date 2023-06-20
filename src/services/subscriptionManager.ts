import { v4 as uuid } from "uuid"

import { subscribe } from "@magicbell/webpush"
import magicBell from "./magicBell"

/**
 * Since we send out notifications to a set of user ids, we need to make sure that each PushSubscription is tied to a user id
 * This class ensures that the currently active PushSubscription is invalidated if the user id changes
 */
export class SubscriptionManager {
  public serviceWorkerRegistration: ServiceWorkerRegistration | null = null
  private serviceWorkerReady: Promise<ServiceWorkerRegistration> | null = null
  private listeners: { [listenerId: string]: () => void }

  public static getOrSetUserId() {
    if (typeof window === "undefined") {
      return ""
    }
    const userId = localStorage.getItem("magicbell:userId")
    if (!userId) {
      const newUserId = `${Math.random()}`.slice(2)
      localStorage.setItem("magicbell:userId", newUserId)
      return newUserId
    }
    return userId
  }

  constructor() {
    this.listeners = {}
    if (typeof window === "undefined") {
      return
    }
    this.serviceWorkerReady = window.navigator.serviceWorker?.ready.then(
      (registration) => {
        this.serviceWorkerRegistration = registration
        return registration
      }
    )
  }
  private getSubscriptionId(userId: string) {
    return `magicbell:subscription:${userId}`
  }

  private getActiveSubscription() {
    return this.serviceWorkerReady?.then((registration) =>
      registration.pushManager?.getSubscription()
    )
  }

  public async subscribe(
    userId: string,
    options: {
      token: string
      project: string
      host: string
    }
  ) {
    await subscribe(options)
    await this.saveActiveSubscriptionIdToLocalStorage(userId)
    await this.sendWelcomeNotification(userId)
  }

  public async sendWelcomeNotification(userId: string) {
    this.getActiveSubscriptionFromLocalStorage(userId, async (subscription) => {
      if (!subscription) {
        console.error("No active subscription found")
        return
      }
      magicBell.sendNotification("welcome")
    })
  }

  public async getActiveSubscriptionFromLocalStorage(
    userId: string,
    cb: (
      activeSubscription: PushSubscription | null,
      SubscriptionManager: SubscriptionManager
    ) => void
  ) {
    const activeSubscription = (await this.getActiveSubscription()) || null
    if (!activeSubscription) {
      return cb(null, this)
    }
    const subscriptionId = this.getSubscriptionId(userId)
    const savedSubscription = localStorage.getItem(subscriptionId)

    if (savedSubscription !== activeSubscription?.endpoint) {
      return cb(null, this)
    }
    return cb(activeSubscription, this)
  }

  /**
   * Subscribe to the currently active subscription for the current user. A 'meta-subscription', if you will!
   * @ param userId
   * @ param cb
   * @ returns unsubscribe function
   */
  public subscribeToActiveSubscriptionFromLocalStorage(
    userId: string,
    cb: (
      activeSubscription: PushSubscription | null,
      SubscriptionManager: SubscriptionManager
    ) => void
  ) {
    const listenerId = uuid()
    const wrappedCallback = async () => {
      await this.getActiveSubscriptionFromLocalStorage(userId, cb)
    }
    wrappedCallback()

    this.listeners[listenerId] = wrappedCallback
    return () => {
      delete this.listeners[listenerId]
    }
  }

  public triggerListeners() {
    Object.values(this.listeners).forEach((listener) => listener())
  }

  private async saveActiveSubscriptionIdToLocalStorage(userId: string) {
    const activeSubscription = await this.getActiveSubscription()
    if (!activeSubscription) {
      throw new Error("No active subscription found")
    }
    const subscriptionId = this.getSubscriptionId(userId)
    localStorage.setItem(subscriptionId, activeSubscription.endpoint)
  }
}

const subscriptionManager = new SubscriptionManager()

export default subscriptionManager
