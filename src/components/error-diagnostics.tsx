import React, { useEffect } from "react"
import va from "@vercel/analytics"

import IosInstructionalVideo from "./ios-instructional-video"
import useDeviceInfo, { DeviceInfo } from "@/hooks/useDeviceInfo"
import { clientSettings } from "@magicbell/react-headless"
import minVersionCheck from "@/utils/minVersionCheck"

/**
 * Here we show the user some diagnostics to help them troubleshoot
 */

export default function ErrorDiagnostics(props: { error: string }) {
  const info = useDeviceInfo()
  useEffect(() => {
    va.track("error", {
      ...info,
      error: props.error,
      id: clientSettings.getState().userExternalId as string, // TODO: fix typing here
    })
  }, [info, props.error])
  function getContent() {
    if (!info) {
      return null
    }
    switch (info.deviceType) {
      case "browser":
        switch (info.notificationApiPermissionStatus) {
          case "denied": {
            if (info.isPrivate) {
              return (
                <p>
                  {`It looks like you are browsing in private mode in ${info.browserName}. Unfortunately, this mode does not support notifications. Please try again in a non-private window.`}
                </p>
              )
            }
            return (
              <p>
                {`It looks like you denied notification permissions for WebPushTest.com in ${info.browserName}. To receive push notifications, please permit us to notify you.`}
              </p>
            )
          }
        }
      case "mobile": {
        switch (info.osName) {
          case "iOS":
            switch (info.standalone) {
              case false:
                return (
                  <div>
                    {`It looks like you have not yet installed this app on your device. Please install it using the instructions below, and try again.`}
                    <IosInstructionalVideo withCaption={false} />
                  </div>
                )
            }
            if (!minVersionCheck(info.osVersion.toString(), 16, 5)) {
              return (
                <p>
                  {`It looks like you are using iOS ${info.osVersion}. This demo requires iOS 16.5 or later.`}
                </p>
              )
            }
        }
        switch (info.notificationApiPermissionStatus) {
          case "denied":
            return (
              <p>
                {`It looks like you denied notification permissions for WebPushTest.com in ${info.browserName}. To receive push notifications, please permit us to notify you.`}
              </p>
            )
        }
      }
    }
    return null
  }
  return <section className="text-center my-4">{getContent()}</section>
}
