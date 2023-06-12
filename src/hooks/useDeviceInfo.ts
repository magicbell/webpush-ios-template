import SubscriptionManager from "@/services/subscriptionManager"
import subscriptionManager from "@/services/subscriptionManager"
import { useEffect, useState } from "react"
import { clientSettings } from "@magicbell/react-headless"
import { browserName, deviceType, osName, osVersion } from "react-device-detect"
import { detectIncognito } from "detectincognitojs"

// contains all relevant info about the device, for troubleshooting Notifications
export type DeviceInfo = {
  standalone: boolean
  browserName: string
  osName: string
  deviceType: string
  isPrivate: boolean
  osVersion: string
  notificationApiPermissionStatus: string
  serviceWorkerStatus: string
  subscriptionState: "pending" | "subscribed" | "unsubscribed"
}

export default function useDeviceInfo() {
  const [info, setInfo] = useState<DeviceInfo | null>(null)
  useEffect(() => {
    const info: DeviceInfo = {
      standalone: window.matchMedia("(display-mode: standalone)").matches, // true if PWA is installed
      browserName,
      osName,
      deviceType,
      osVersion,
      isPrivate: false,
      // note that user may still not have granted notification permissions on a system settings level
      notificationApiPermissionStatus:
        typeof Notification !== "undefined"
          ? Notification.permission
          : "Notification API unsupported",
      serviceWorkerStatus: "fetching",
      subscriptionState: "pending",
    }

    subscriptionManager.getActiveSubscriptionFromLocalStorage(
      clientSettings.getState().userExternalId as string, // TODO: fix typing here
      async (activeSubscription, context) => {
        const { isPrivate } = await detectIncognito()

        setInfo((info) =>
          info
            ? {
                ...info,
                isPrivate,
                serviceWorkerStatus:
                  context.serviceWorkerRegistration?.active?.state ||
                  "inactive",
                subscriptionState: Boolean(activeSubscription)
                  ? "subscribed"
                  : "unsubscribed",
              }
            : null
        )
      }
    )

    setInfo(info)
  }, [])

  return info
}
