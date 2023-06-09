import React, { useEffect, useMemo, useState } from "react"
import { useConfig, clientSettings } from "@magicbell/react-headless"
import { prefetchConfig, registerServiceWorker } from "@magicbell/webpush"

import { DeviceInfo } from "@/hooks/useDeviceInfo"
import subscriptionManager from "@/services/subscriptionManager"

type State =
  | { status: "idle" | "busy" | "success" }
  | { status: "error"; error: string }
  | { status: "unsupported" }

export default function Subscriber({ info }: { info: DeviceInfo }) {
  const [state, setState] = useState<State>({ status: "idle" })
  const config = useConfig()

  const subscribeOptions = useMemo(() => {
    const host = "https://api.magicbell.com"
    try {
      const url = new URL(config.channels?.webPush.config.subscribeUrl || "")
      return {
        token: url.searchParams.get("access_token") || "",
        project: url.searchParams.get("project") || "",
        host,
      }
    } catch (e) {
      return { token: "", project: "", host }
    }
  }, [config])

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
        clientSettings.getState().userExternalId as string, // TODO: fix typing here
        subscribeOptions
      )
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
  }

  const isLoading = !subscribeOptions.token || state.status === "busy"
  const isSubscribed =
    state.status === "success" || info.subscriptionState === "subscribed"

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

  if (isSubscribed) {
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
