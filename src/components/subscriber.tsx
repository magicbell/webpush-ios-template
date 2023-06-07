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
    // this is true in customization mode, we use it to theme the dialog
    const permission = await Notification.requestPermission()
    try {
      setState({ status: "busy" })
      await subscribe(subscribeOptions)
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
  }

  if (!subscribeOptions.token) {
    return <div>Missing access_token</div>
  }

  return <button onClick={handleSubscribe}>Subscribe</button>
}
