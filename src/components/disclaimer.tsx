import React from "react"
import Image from "next/image"

export const magicBellHandle = "magicbell_io"

export default function Disclaimer() {
  return (
    <section className="flex flex-col gap-3 pb-6">
      <a
        className="flex items-center justify-center gap-2 flex-col"
        href="https://www.magicbell.com/"
        target="_blank"
      >
        <span className="text-muted text-xs">built by</span>
        <Image
          height={20}
          width={103}
          src="/logo.svg"
          alt="magic bell logo"
        ></Image>
      </a>
    </section>
  )
}
