import React from "react"

const width = 260

export default function Instructional() {
  return (
    <div className="text-center mx-auto" style={{ width }}>
      <caption className="text-gray-400 text-xs w-full block my-2">
        If running this demo on iOS, ensure you are using 16.5 or later, and
        have this PWA &apos;installed&apos; with Safari (installation
        instructions below)
      </caption>
      <video
        className="inline-block"
        src="/instructional.mp4"
        width={width}
        controls
      ></video>
    </div>
  )
}
