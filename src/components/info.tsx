import React, { useEffect, useState } from "react"
import { deviceDetect } from "react-device-detect"

// This component shows PWA-push related information to the user

export default function Info() {
  const [info, setInfo] = useState({})

  useEffect(() => {
    // put this in a useEffect to avoid SSR errors
    const info = {
      [`window.matchMedia('(display-mode: standalone)').matches`]:
        window.matchMedia("(display-mode: standalone)").matches,
      [`"standalone" in window.navigator`]: "standalone" in window.navigator,
      [`/iPad|iPhone|iPod/.test(navigator.userAgent)`]: /iPad|iPhone|iPod/.test(
        navigator.userAgent
      ),
    }
    Object.assign(info, deviceDetect(window.navigator.userAgent))
    setInfo(info)
  }, [])
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-2 bg-gray-800 text-gray-100 p-4 rounded-lg text-xs md:text-lg">
        {Object.entries(info).map(([key, value]) => (
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
