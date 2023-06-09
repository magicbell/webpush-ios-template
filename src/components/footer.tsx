import React from "react"
import Image from "next/image"

export const magicBellHandle = "magicbell_io"

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 py-6">
      <a
        className="flex items-center justify-center gap-2"
        href="https://www.magicbell.com/"
        target="_blank"
      >
        <span className="text-muted text-xs">powered by</span>
        <Image
          height={20}
          width={103}
          src="/logo.svg"
          alt="magic bell logo"
        ></Image>
      </a>
      <a
        className="flex items-center justify-center gap-2"
        href={`https://twitter.com/intent/user?screen_name=${magicBellHandle}`}
        target="_blank"
      >
        <Image width={16} height={15} alt="twitter" src="/twitter-logo.svg" />
        <span className="text-hover text-sm">Follow us</span>
      </a>
    </footer>
  )
}
