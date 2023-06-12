import Image from "next/image"
import React from "react"

export default function ContentWrapper(props: {
  children: React.ReactNode
  message: string
}) {
  return (
    <section className="text-center text-text ">
      <Image
        src="/rocket.svg"
        className="inline-block my-4"
        alt="rocket"
        width={24}
        height={24}
      />

      <h3 className="leading-8 text-lg font-bold">WebPushTest.com</h3>
      <p className="font-normal text-sm">{props.message}</p>
      {props.children}
    </section>
  )
}
