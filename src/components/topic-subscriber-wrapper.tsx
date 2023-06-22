import React from "react"
import TopicSubscriber, { Topic } from "./topic-subscriber"

interface IProps {
  topics: Topic[]
  interactive: boolean
  onAfterInteract: () => void
  renderDescription?: () => React.ReactNode
}

export default function TopicSubscriberWrapper(props: IProps) {
  return (
    <div className="">
      <div
        className="grid gap-4 items-center justify-center"
        style={{ gridTemplateColumns: "1fr" }}
      >
        {props.topics.map((topic) => {
          return (
            <TopicSubscriber
              {...topic}
              key={topic.id}
              idle={!props.interactive}
              onAfterInteract={props.onAfterInteract}
            />
          )
        })}
      </div>
      <div className="flex gap-4 items-center my-3">
        {props.renderDescription ? (
          <p className="text-muted text-xs">{props.renderDescription()}</p>
        ) : null}
      </div>
    </div>
  )
}
