import Image from "next/image"
import React from "react"

function Tile(props: {
  index: number
  caption: string
  captionHeight?: number
}) {
  return (
    <figure
      className="relative border-t-2 border-gray-600 mb-8"
      style={{ paddingBottom: "100%" }}
    >
      <figcaption
        className={`absolute w-full leading-16 h-16 top-0 flex items-center justify-center text-muted text-sm`}
      >
        <span className="text-text mr-2">{`Step ${props.index}:`}</span>
        {props.caption}
      </figcaption>
      <Image
        style={{ top: 0 }}
        src={`/ios_step_${props.index}.jpg`}
        alt={`ios step ${props.index}`}
        className={`object-contain pt-16`}
        fill
      />
    </figure>
  )
}

export default function IosInstructionalStatic() {
  return (
    <>
      <h3 className="text-center h-8 leading-8 uppercase text-xs">
        Installation instructions
      </h3>
      <section className="w-full max-w-xs mx-auto">
        <Tile index={1} caption={"In Safari, click the 'share' button"} />
        <Tile index={2} caption={"Click 'Add to Home Screen'"} />
        <Tile index={3} caption={"Review settings and click 'Add'"} />
        <Tile index={4} caption={"Launch app from home screen"} />
      </section>
    </>
  )
}
