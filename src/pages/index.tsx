import Head from "next/head"
import { useEffect, useState } from "react"
import { MagicBellProvider } from "@magicbell/react-headless"
import { Inter } from "next/font/google"

import Info from "@/components/info"
import Subscriber from "@/components/subscriber"
import useDeviceInfo from "@/hooks/useDeviceInfo"
import { SubscriptionManager } from "@/services/subscriptionManager"
import Instructional from "@/components/instructional"
import ContentWrapper from "@/components/content-wrapper"
import Footer, { magicBellHandle } from "@/components/footer"
import ErrorDiagnostics from "@/components/error-diagnostics"

const inter = Inter({ subsets: ["latin"] })

export type State =
  | { status: "idle" | "busy" | "success" }
  | { status: "error"; error: string }
  | { status: "unsupported" }

export default function MyComponent() {
  const [state, setState] = useState<State>({ status: "idle" })
  const info = useDeviceInfo()

  function result(state: State) {
    if (!info) {
      return null
    }
    if (
      (state.status === "idle" || state.status === "busy") &&
      !info.standalone
    ) {
      return <Instructional withCaption />
    }
    if (state.status === "error") {
      return (
        <>
          <ErrorDiagnostics error={state.error}></ErrorDiagnostics>
          <Info info={info}></Info>
        </>
      )
    }
    if (state.status === "success") {
      return (
        <>
          <section className="text-center text-muted text-sm mx-2 my-4">
            <p className="my-2">
              You should soon receive a notification on your device.
            </p>
            <p className="my-2">
              If not, first try checking your browser notification settings at
              the operating system level (it is possible that notifications are
              muted for your current browser).
            </p>
            <p className="my-2">
              If this does not explain it, we would love it if you could tag us{" "}
              <a
                className="text-text"
                href={`https://twitter.com/intent/user?screen_name=${magicBellHandle}`}
                target="_blank"
              >
                @magicbell_io
              </a>
              , with reference to your device settings displayed below.
            </p>
          </section>
          <Info info={info}></Info>
        </>
      )
    }
  }

  return (
    <MagicBellProvider
      apiKey={process.env.NEXT_PUBLIC_MAGICBELL_API_KEY}
      userExternalId={SubscriptionManager.getOrSetUserId()}
    >
      <Head>
        <title>Web Push Notifications Demo | Magic Bell</title>
        <meta
          name="description"
          content="Web push notifications demo and starter template with support for iOS Safari PWA notifications."
          key="desc"
        />
        <meta property="og:title" content="Web Push Notifications Demo" />
        <meta
          property="og:description"
          content="Web push notifications demo and starter template with support for iOS Safari PWA notifications."
        />
        <meta property="og:image" content="/sharing-image.png" />
        <meta property="og:image:width" content="750" />
        <meta property="og:image:width" content="910" />
        <meta property="og:url" content="https://webpushtest.com" />
        <meta property="og:type" content="Website" />
      </Head>
      <div className={"h-full w-full text-text " + inter.className}>
        {!info ? (
          <div>Fetching Info</div>
        ) : (
          <section className="h-full max-w-screen-md mx-auto">
            <ContentWrapper
              message={
                state.status === "error"
                  ? ""
                  : "Click 'subscribe' to enable Push Notifications"
              }
            >
              <Subscriber info={info} state={state} setState={setState} />
            </ContentWrapper>
            {result(state)}
          </section>
        )}
      </div>
      <Footer />
    </MagicBellProvider>
  )
}
