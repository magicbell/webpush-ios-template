import React, { useEffect, useMemo, useState } from "react"
import { useConfig, clientSettings } from "@magicbell/react-headless"
import { prefetchConfig, registerServiceWorker } from "@magicbell/webpush"
import Image from "next/image"

import { DeviceInfo } from "@/hooks/useDeviceInfo"
import subscriptionManager from "@/services/subscriptionManager"
import { State } from "@/pages"

const resendDelay = 10 * 1000

function Button(props: {
  text: string
  classname: string
  disabled: boolean
  onClick?: () => void
}) {
  return (
    <>
      <Image
        src="/rocket.svg"
        className="inline-block my-6"
        alt="rocket"
        width={36}
        height={36}
      />
      <button
        onClick={props.onClick}
        className={
          "w-full block mb-4 py-2 px-4 rounded text-text text-md h-10 font-semibold box-border " +
          props.classname
        }
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </>
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
  const [resendAvailable, setResendAvailable] = useState(false)
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

  const handleResend = async () => {
    try {
      setState({ status: "busy" })
      await subscriptionManager.sendWelcomeNotification(
        clientSettings.getState().userExternalId as string // TODO: fix typing here
      )
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
    setResendAvailable(false)
    setTimeout(() => {
      setResendAvailable(true)
    }, resendDelay)
  }

  const isLoading = !subscribeOptions.token || state.status === "busy"
  const isSubscribed =
    state.status === "success" || info.subscriptionState === "subscribed"

  useEffect(() => {
    if (state.status === "success") {
      setTimeout(() => {
        setResendAvailable(true)
      }, resendDelay)
    } else if (info.subscriptionState === "subscribed") {
      setResendAvailable(true)
    }
  }, [state.status, info.subscriptionState])

  if (isLoading) {
    return <Button text="Loading" classname="bg-gray-500" disabled={true} />
  }

  if (state.status === "error") {
    return <Button text="Error" classname="bg-red-400" disabled={true} />
  }

  if (isSubscribed) {
    if (resendAvailable) {
      return (
        <Button
          onClick={handleResend}
          text="Resend"
          classname="bg-primary"
          disabled={false}
        />
      )
    }
    return (
      <Button
        text="Notification on its way!"
        classname="bg-green-500"
        disabled={true}
      />
    )
  }

  return (
    <>
      <Button
        onClick={handleSubscribe}
        text="Subscribe"
        classname="bg-primary"
        disabled={false}
      />
      <p className="text-xs my-6">
        * Once we subscribe we will send you one automatic test-notification.
        You can unsubscribe at any time.
      </p>
    </>
  )
}
