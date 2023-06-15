import React, { useRef, useState } from "react"
import { DeviceInfo } from "@/hooks/useDeviceInfo"
import * as Toast from "@radix-ui/react-toast"

import Image from "next/image"

function giveFeedback(info: DeviceInfo) {}

// TODO: make me copiable
// TODO: make me collapsible

// This component shows PWA-push related information to the user
export default function Info({ info }: { info: DeviceInfo }) {
  const infoRef = useRef<HTMLUListElement>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const timerRef = useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="display-block w-full"
        onClick={() => {
          setToastOpen(false)
          window.clearTimeout(timerRef.current)
          timerRef.current = window.setTimeout(() => {
            navigator.clipboard.writeText(
              infoRef.current?.innerText || "No info"
            )
            setToastOpen(true)
          }, 100)
        }}
      >
        <ul
          className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gray-800 text-gray-100 p-4 rounded-lg text-xs md:text-lg relative"
          ref={infoRef}
        >
          {info &&
            Object.entries(info).map(([key, value]) => (
              <li key={key} className="contents">
                <code className="text-right overflow-hidden text-ellipsis text-gray-400">
                  {key}
                </code>
                <code className="text-left">{String(value)}</code>
              </li>
            ))}
        </ul>
      </button>
      <Toast.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        className="ToastRoot"
      >
        <Toast.Title className="ToastTitle">
          Device details copied to clipboard
        </Toast.Title>
        <Toast.Description asChild></Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  )
}
