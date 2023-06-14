import React from "react"
import { DeviceInfo } from "@/hooks/useDeviceInfo"

function giveFeedback(info: DeviceInfo) {}

// TODO: make me copiable
// TODO: make me collapsible

// This component shows PWA-push related information to the user
export default function Info({ info }: { info: DeviceInfo }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gray-800 text-gray-100 p-4 rounded-lg text-xs md:text-lg">
        {info &&
          Object.entries(info).map(([key, value]) => (
            <li key={key} className="contents">
              <code className="text-right overflow-hidden text-ellipsis text-gray-400">
                {key}
              </code>
              <code>{String(value)}</code>
            </li>
          ))}
      </ul>
    </div>
  )
}
