import { MagicBellProvider } from "@magicbell/react-headless"

import Info from "@/components/info"
import Subscriber from "@/components/subscriber"
import useDeviceInfo from "@/hooks/useDeviceInfo"
import { SubscriptionManager } from "@/services/subscriptionManager"

export default function MyComponent() {
  const info = useDeviceInfo()
  return (
    <MagicBellProvider
      apiKey={process.env.NEXT_PUBLIC_MAGICBELL_API_KEY as string}
      userExternalId={SubscriptionManager.getOrSetUserId()}
    >
      <div className="flex justify-center h-full w-full">
        {!info ? (
          <div>Fetching Info</div>
        ) : (
          <section className="h-full max-w-screen-md">
            <Subscriber info={info} />
            <Info info={info} />
          </section>
        )}
      </div>
    </MagicBellProvider>
  )
}
