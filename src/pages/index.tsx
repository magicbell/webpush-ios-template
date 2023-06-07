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
      <div className="flex justify-center h-full w-full">
        <section className="h-full max-w-screen-md">
          <Subscriber />
          <Info />
        </section>
      </div>
    </MagicBellProvider>
  )
}
