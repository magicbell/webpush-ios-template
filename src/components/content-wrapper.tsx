import Image from "next/image"
import React from "react"
import Info from "./info"
import useDeviceInfo, { DeviceInfo } from "@/hooks/useDeviceInfo"

export default function ContentWrapper(props: {
  children: React.ReactNode
  message: string
}) {
  return (
    <section className="px-8 text-center text-text">
      <p className="font-normal text-sm">{props.message}</p>
      {props.children}
    </section>
  )
}
