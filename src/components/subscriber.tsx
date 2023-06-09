import React, { useEffect, useMemo, useState } from "react"
import { useConfig, clientSettings } from "@magicbell/react-headless"
import { prefetchConfig, registerServiceWorker } from "@magicbell/webpush"

import { DeviceInfo } from "@/hooks/useDeviceInfo"
import subscriptionManager from "@/services/subscriptionManager"
import { State } from "@/pages"

function Button(props: {
  text: string
  classname: string
  disabled: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        "block mx-auto my-4 py-2 px-4 rounded text-text text-sm h-10 font-semibold " +
        props.classname
      }
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default function Subscriber({
  info,
  state,
  setState,
}: {
  info: DeviceInfo
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}) {
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
    return <Button text="Loading" classname="bg-gray-500" disabled={true} />
  }

  if (state.status === "error") {
    return <Button text="Error" classname="bg-red-400" disabled={true} />
  }

  if (isSubscribed) {
    return (
      <Button
        text="Notification on its way!"
        classname="bg-green-500"
        disabled={true}
      />
    )
  }

  return (
    <Button
      onClick={handleSubscribe}
      text="Subscribe"
      classname="bg-primary"
      disabled={false}
    />
  )
}
