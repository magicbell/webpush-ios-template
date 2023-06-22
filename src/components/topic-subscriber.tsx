import React, { useCallback, useState } from "react"
import va from "@vercel/analytics"

import useDeviceInfo from "@/hooks/useDeviceInfo"
import magicBell from "@/services/magicBell"
import subscriptionManager from "@/services/subscriptionManager"

export type Topic = {
  id: string
  name: string
}

export default function TopicSubscriber(
  props: Topic & { idle: boolean; onAfterInteract?: () => void }
) {
  const info = useDeviceInfo()
  const [subscribing, setSubscribing] = useState(false)
  const [unsubscribing, setUnsubscribing] = useState(false)
  const isSubscribed = info?.topics.includes(props.id)

  const handleUnsubscribe = useCallback(async () => {
    setUnsubscribing(true)
    await magicBell.unsubscribeFromTopic(props.id)
    setUnsubscribing(false)
    subscriptionManager.triggerListeners()
    va.track("unsubscribe", {
      topic: props.id,
    })
  }, [props])

  const handleSubscribe = useCallback(async () => {
    setSubscribing(true)
    await magicBell.subscribeToTopic(props.id, true)
    setSubscribing(false)
    subscriptionManager.triggerListeners()
    if (props.onAfterInteract) props.onAfterInteract()
    va.track("subscribe", {
      topic: props.id,
    })
  }, [props])

  return (
    <div className="contents" key={props.id}>
      <button
        disabled={props.idle || subscribing || unsubscribing}
        type="button"
        className={
          "hover-button text-left inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        }
        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
      >
        {isSubscribed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            width="15"
            height="15"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L542.6 400c2.7-7.8 1.3-16.5-3.9-23l-14.9-18.6C495.5 322.9 480 278.8 480 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V49.9c-43.9 7-81.5 32.7-104.4 68.7L38.8 5.1zM221.7 148.4C239.6 117.1 273.3 96 312 96h8 8c57.4 0 104 46.6 104 104v33.4c0 32.7 6.4 64.8 18.7 94.5L221.7 148.4zM406.2 416l-60.9-48H168.3c21.2-32.8 34.4-70.3 38.4-109.1L160 222.1v11.4c0 45.4-15.5 89.5-43.8 124.9L101.3 377c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6H406.2zM384 448H320 256c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="12"
            height="12"
            fill="currentColor"
            className="shrink-0"
          >
            <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
          </svg>
        )}
        {isSubscribed
          ? `Unsubscribe from ${props.name}`
          : `Subscribe to ${props.name}`}
      </button>
    </div>
  )
}
