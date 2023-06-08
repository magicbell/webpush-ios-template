import useDeviceInfo, { DeviceInfo } from "@/hooks/useDeviceInfo"
import React, { useEffect, useState } from "react"

function giveFeedback(info: DeviceInfo) {}

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
              </code>{" "}
              <code>{String(value)}</code>
            </li>
          ))}
      </ul>
    </div>
  )
}
