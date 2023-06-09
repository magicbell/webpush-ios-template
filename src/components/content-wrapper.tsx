import Image from "next/image"
import React from "react"

export default function ContentWrapper(props: { children: React.ReactNode }) {
  return (
    <section className="text-center text-text ">
      <Image
        src="/rocket.svg"
        className="inline-block my-4"
        alt="rocket"
        width={24}
        height={24}
      />

      <h3 className="leading-8 text-lg font-bold">Web Push Test</h3>
      <p className="font-normal text-sm">
        Click &apos;subscribe&apos; to enable Push Notifications
      </p>
      {props.children}
    </section>
  )
}