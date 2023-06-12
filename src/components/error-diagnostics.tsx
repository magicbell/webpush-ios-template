import React, { useEffect } from "react"
import va from "@vercel/analytics"

import Instructional from "./instructional"
import { DeviceInfo } from "@/hooks/useDeviceInfo"
import { clientSettings } from "@magicbell/react-headless"

/**
 * Here we show the user some diagnostics to help them troubleshoot
 */

export default function ErrorDiagnostics(props: {
  info: DeviceInfo
  error: string
}) {
  useEffect(() => {
    va.track("error", {
      ...props.info,
      error: props.error,
      id: clientSettings.getState().userExternalId as string, // TODO: fix typing here
    })
  }, [props.info, props.error])
  function getContent() {
    switch (props.info.deviceType) {
      case "browser":
        switch (props.info.notificationApiPermissionStatus) {
          case "denied": {
            if (props.info.isPrivate) {
              return (
                <p>
                  {`It looks like you are browsing in private mode in ${props.info.browserName}. Unfortunately, this mode does not support notifications. Please try again in a non-private window.`}
                </p>
              )
            }
            return (
              <p>
                {`It looks like you have denied notification permissions for this site in ${props.info.browserName}. If you wish to see notifications come through, notification permissions need to be granted.`}
              </p>
            )
          }
        }
      case "mobile": {
        switch (props.info.osName) {
          case "iOS":
            switch (props.info.standalone) {
              case false:
                return (
                  <div>
                    {`It looks like you have not yet installed this app on your device. Please install it using the instructions below, and try again.`}
                    <Instructional withCaption={false} />
                  </div>
                )
            }
            const [osMajorVersion, osMinorVersion] = props.info.osVersion
              .toString()
              .split(".")
            if (
              Number(osMajorVersion) < 16 ||
              (Number(osMajorVersion) === 16 && Number(osMinorVersion) < 5)
            ) {
              return (
                <p>
                  {`It looks like you are using iOS ${props.info.osVersion}. This demo requires iOS 16.5 or later.`}
                </p>
              )
            }
        }
        switch (props.info.notificationApiPermissionStatus) {
          case "denied":
            return (
              <p>
                {`It looks like you have denied notification permissions for this site in ${props.info.browserName}. If you wish to see notifications come through, notification permissions need to be granted.`}
              </p>
            )
        }
      }
    }
    return null
  }
  return <section className="text-center my-4">{getContent()}</section>
}
