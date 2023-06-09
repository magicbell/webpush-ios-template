import React from "react"
import ReactPlayer from "react-player"

const width = 260

export default function Instructional() {
  return (
    <figure className="text-center mx-auto" style={{ width }}>
      <figcaption className="text-gray-400 text-xs w-full block my-2">
        If running this demo on iOS, ensure you are using 16.5 or later, and
        have this PWA &apos;installed&apos; with Safari (installation
        instructions below)
      </figcaption>
      <ReactPlayer
        controls={true}
        className="inline-block"
        url="/instructional.mp4"
        width={width}
      ></ReactPlayer>
    </figure>
  )
}
