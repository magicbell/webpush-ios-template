import React from "react"
import Button from "./button"
import subscriptionManager from "@/services/subscriptionManager"
import { clientSettings } from "@magicbell/react-headless"
import TopicSubscriberWrapper from "./topic-subscriber-wrapper"
import { topics } from "@/constants/topics"
import magicBell from "@/services/magicBell"

/**
 * This component shows once the user has successfully subscribed to Webpush.
 * Here they have the option to send more test notifications, or subscribe to granular topics.
 */

interface IProps {
  interactive: boolean
  onAfterInteract: () => void
  onError: (message: string) => void
}

export default function PostSubscribeActions(props: IProps) {
  const handleResend = async () => {
    try {
      await magicBell.sendNotification("hn_random")
    } catch (error: any) {
      props.onError(error.message)
    }
    props.onAfterInteract()
  }

  return (
    <>
      {props.interactive ? (
        <Button
          onClick={handleResend}
          text="Send me a random HN post"
          classname="bg-primary"
          disabled={false}
        />
      ) : (
        <Button
          text="Notification on its way!"
          classname="bg-green-500"
          disabled={true}
          loading
        />
      )}
      {/* <div className="">OR</div>
      <TopicSubscriberWrapper
        description="Now that you have webpush successfully enabled, subscribe to any of
            the HackerNews feeds below and receive a relevant notification about
            top posts every 6 hours. Unsubscribe at any time."
        topics={Object.values(topics)}
        interactive={props.interactive}
        onAfterInteract={props.onAfterInteract}
      /> */}
    </>
  )
}
