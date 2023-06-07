import Info from "@/components/info"
import Subscriber from "@/components/subscriber"
import { MagicBellProvider } from "@magicbell/react-headless"

export default function MyComponent() {
  return (
    <MagicBellProvider
      apiKey={process.env.NEXT_PUBLIC_MAGICBELL_API_KEY as string}
      userEmail={process.env.NEXT_PUBLIC_MAGICBELL_USER_EMAIL as string}
      userKey={process.env.NEXT_PUBLIC_MAGICBELL_USER_KEY as string}
    >
      <Subscriber />
      <Info />
    </MagicBellProvider>
  )
}
