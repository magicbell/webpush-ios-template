import React, { useRef, useState } from "react"
import { DeviceInfo } from "@/hooks/useDeviceInfo"
import * as Toast from "@radix-ui/react-toast"

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
              info ? JSON.stringify(info, null, 2) : "No info"
            )
            setToastOpen(true)
          }, 100)
        }}
      >
        <ul
          className="grid grid-cols-2 gap-x-8 gap-y-2 bg-section text-gray-100 p-4 rounded-lg text-xs md:text-lg relative pb-10"
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
      <p className="w-full flex justify-center items-center gap-x-2 absolute bottom-0 left-0 text-muted text-xs p-2 pointer-events-none text-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        Click anywhere in panel to copy details to clipboard
      </p>
    </Toast.Provider>
  )
}
