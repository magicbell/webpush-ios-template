import React from "react"
import { Stream } from "@cloudflare/stream-react"

const width = 260

type Props =
  | {
      withCaption: true
      captionText?: string
    }
  | {
      withCaption: false
    }

export default function IosInstructionalVideo(props: Props) {
  return (
    <figure className="text-center mx-auto" style={{ width }}>
      {
        <figcaption className="text-gray-400 text-xs w-full block my-2">
          {props.withCaption
            ? props.captionText ||
              `If running this demo on iOS, ensure you are using 16.5 or later, and
          have this PWA "installed"; with Safari (installation
          instructions below`
            : null}
        </figcaption>
      }
      <Stream controls src={"2817ad7f5925421901884ddd4b54d6df"} />
    </figure>
  )
}
