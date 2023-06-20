import React, { useCallback, useState } from "react"
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
  }, [props])

  const handleSubscribe = useCallback(async () => {
    setSubscribing(true)
    await magicBell.subscribeToTopic(props.id, true)
    setSubscribing(false)
    subscriptionManager.triggerListeners()
    if (props.onAfterInteract) props.onAfterInteract()
  }, [props])

  return (
    <div className="contents" key={props.id}>
      {isSubscribed ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      )}
      <button
        disabled={isSubscribed || props.idle || subscribing}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md border-primary border-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:enabled:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        onClick={handleSubscribe}
      >
        {`Subscribe to ${props.name}`}
      </button>
      {unsubscribing ? (
        <div>Loading</div>
      ) : isSubscribed ? (
        <button
          className="text-muted text-xs hover:enabled:text-text"
          onClick={handleUnsubscribe}
          disabled={props.idle}
        >
          Unsubscribe
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}
