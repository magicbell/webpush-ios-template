import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { MagicBellProvider } from "@magicbell/react-headless"
import { SubscriptionManager } from "@/services/subscriptionManager"
import { DeviceInfoProvider } from "@/hooks/useDeviceInfo"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MagicBellProvider
        apiKey={process.env.NEXT_PUBLIC_MAGICBELL_API_KEY}
        userExternalId={SubscriptionManager.getOrSetUserId()}
      >
        <DeviceInfoProvider>
          <Component {...pageProps} />
        </DeviceInfoProvider>
      </MagicBellProvider>
      <Analytics />
    </>
  )
}
