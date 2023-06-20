import React from "react"
import TopicSubscriber, { Topic } from "./topic-subscriber"

interface IProps {
  topics: Topic[]
  interactive: boolean
  onAfterInteract: () => void
  description?: string
}

export default function TopicSubscriberWrapper(props: IProps) {
  return (
    <div className="">
      <div className="flex gap-4 items-center my-3">
        {props.description ? (
          <p className="text-muted text-xs">{props.description}</p>
        ) : null}
      </div>
      <div
        className="grid gap-4 items-center justify-center"
        style={{ gridTemplateColumns: "20px 1fr 75px" }}
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
    </div>
  )
}
