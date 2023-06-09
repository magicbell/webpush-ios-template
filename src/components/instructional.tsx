import React from "react"
import { Stream } from "@cloudflare/stream-react"

const width = 260

export default function Instructional() {
  return (
    <figure className="text-center mx-auto" style={{ width }}>
      <figcaption className="text-gray-400 text-xs w-full block my-2">
        If running this demo on iOS, ensure you are using 16.5 or later, and
        have this PWA &apos;installed&apos; with Safari (installation
        instructions below)
      </figcaption>
      <Stream controls src={"2817ad7f5925421901884ddd4b54d6df"} />
    </figure>
  )
}
