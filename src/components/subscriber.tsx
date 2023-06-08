import React, { useEffect, useMemo, useState } from "react"
import { useConfig, clientSettings } from "@magicbell/react-headless"
import {
  prefetchConfig,
  registerServiceWorker,
  subscribe,
} from "@magicbell/webpush"

import { DeviceInfo } from "@/hooks/useDeviceInfo"
import subscriptionManager from "@/services/subscriptionManager"

const getUrlParams = (url) => {
  const params = {}
  const searchParams = /([^?=&]+)(=([^&]*))?/g
  let match

  while ((match = searchParams.exec(url)) !== null) {
    const key = decodeURIComponent(match[1])
    const value = decodeURIComponent(match[3] || "")

    params[key] = value
  }

  return params
}

type State =
  | { status: "idle" | "busy" | "success" }
  | { status: "error"; error: string }
  | { status: "unsupported" }

export default function Subscriber({ info }: { info: DeviceInfo }) {
  const [state, setState] = useState<State>({ status: "idle" })
  const config = useConfig()
  const url = config.channels?.webPush.config.subscribeUrl

  const subscribeOptions = useMemo(() => {
    const searchParams = getUrlParams(url)
    return {
      token: (searchParams as any).access_token,
      project: (searchParams as any).project,
      host: "https://api.magicbell.com",
    }
  }, [url])

  useEffect(() => {
    if (!subscribeOptions.token) {
      return
    }
    registerServiceWorker()
    prefetchConfig(subscribeOptions)
  }, [subscribeOptions])

  const handleSubscribe = async () => {
    try {
      setState({ status: "busy" })
      await subscriptionManager.subscribe(
        clientSettings.getState().userEmail as string,
        subscribeOptions
      )
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
  }

  const isLoading = !subscribeOptions.token || state.status === "busy"
  const isGranted =
    typeof Notification !== "undefined" &&
    Notification.permission === "granted" &&
    state.status === "success"

  if (isLoading) {
    return (
      <button
        className="block mx-auto my-2 bg-gray-500 text-white font-bold py-2 px-4 rounded"
        disabled
      >
        Loading
      </button>
    )
  }

  if (isGranted) {
    return (
      <button
        className="block mx-auto my-2 bg-green-500 text-white font-bold py-2 px-4 rounded"
        disabled
      >
        Subscribed
      </button>
    )
  }

  return (
    <button
      onClick={handleSubscribe}
      className="block mx-auto my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Subscribe
    </button>
  )
}
