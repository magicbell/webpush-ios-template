/**
 * Since we send out notifications to a set of user id's, we need to make sure that each PushSubscription is tied to a user id.
 * This class ensures that this is the case.
 */
export class SubscriptionManager {
  public serviceWorkerRegistration: ServiceWorkerRegistration | null = null
  private serviceWorkerReady: Promise<ServiceWorkerRegistration> | null = null

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
      registration.pushManager.getSubscription()
    )
  }

  public async saveToLocalStorage(userId: string) {
    const activeSubscription = await this.getActiveSubscription()
    if (!activeSubscription) {
      throw new Error("No active subscription found")
    }
    const subscriptionId = this.getSubscriptionId(userId)
    localStorage.setItem(subscriptionId, activeSubscription.endpoint)
  }

  public async getFromLocalStorage(
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
}

const subscriptionManager = new SubscriptionManager()

export default subscriptionManager
