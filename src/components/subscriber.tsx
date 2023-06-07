import React, { useEffect, useMemo, useState } from "react"
import { useConfig } from "@magicbell/react-headless"
import {
  prefetchConfig,
  registerServiceWorker,
  subscribe,
} from "@magicbell/webpush"

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

export default function Subscriber() {
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
    await Notification.requestPermission()
    try {
      setState({ status: "busy" })
      await subscribe(subscribeOptions)
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
  }

  if (!subscribeOptions.token) {
    return (
      <button
        className="block mx-auto my-2 bg-gray-500 text-white font-bold py-2 px-4 rounded"
        disabled
      >
        Missing access_token
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
