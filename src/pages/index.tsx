import Head from "next/head"
import { useEffect, useState } from "react"
import { MagicBellProvider } from "@magicbell/react-headless"
import { Inter } from "next/font/google"

import Subscriber from "@/components/subscriber"
import useDeviceInfo from "@/hooks/useDeviceInfo"
import { SubscriptionManager } from "@/services/subscriptionManager"
import IosInstructionalStatic from "@/components/ios-instructional-static"
import ContentWrapper from "@/components/content-wrapper"
import ErrorDiagnostics from "@/components/error-diagnostics"
import minVersionCheck from "@/utils/minVersionCheck"
import Disclaimer, { magicBellHandle } from "@/components/disclaimer"
import Footer from "@/components/footer"
import Links from "@/components/links"

const inter = Inter({ subsets: ["latin"] })

// TODO: make the various sections have different background color shades

export type State =
  | { status: "idle" | "busy" | "success" }
  | { status: "error"; error: string }
  | { status: "unsupported" }

export default function MyComponent() {
  const [footerOpen, setFooterOpen] = useState(false)
  const [state, setState] = useState<State>({ status: "idle" })
  const info = useDeviceInfo()

  function actions(state: State) {
    if (!info) {
      return null
    }
    if (info.osName === "iOS") {
      if (minVersionCheck(info.osVersion.toString(), 16, 5)) {
        if (!info.standalone) return <IosInstructionalStatic />
      } else {
        return (
          <p className="text-center text-red-400 my-6">
            This demo requires iOS 16.5 or later. Please run a software update
            to continue.
          </p>
        )
      }
    }
    if (info.isPrivate) {
      return (
        <p className="text-center text-red-400 my-6">
          This demo requires a non-private browser window, since the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Notification"
            target="_blank"
            className="underline"
          >
            Notification API
          </a>{" "}
          is set to &quot;denied&quot; by default.
        </p>
      )
    }
    return <Subscriber info={info} state={state} setState={setState} />
  }

  function result(state: State) {
    if (state.status === "idle" || state.status === "busy") {
      return
    }
    if (state.status === "error") {
      return (
        <>
          <ErrorDiagnostics error={state.error}></ErrorDiagnostics>
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
        </>
      )
    }
  }

  useEffect(() => {
    if (state.status === "success" || state.status === "error") {
      setFooterOpen(true)
    }
  }, [state.status])

  return (
    <>
      <header
        className={
          "border-primary border-opacity-50 border-b-2 leading-8 text-lg font-bold text-gray-200 py-4 bg-section text-center " +
          inter.className
        }
      >
        WebPushTest.com
      </header>
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
          <meta property="og:image:width" content="432" />
          <meta property="og:image:width" content="226" />
          <meta property="og:url" content="https://webpushtest.com" />
          <meta property="og:type" content="Website" />
        </Head>
        <main className={"w-full text-text pb-10 px-8 " + inter.className}>
          {!info ? (
            <div>Fetching Info</div>
          ) : (
            <div className="h-full max-w-screen-md mx-auto">
              <ContentWrapper message={""}>{actions(state)}</ContentWrapper>
              {result(state)}
              <Links />
              <Disclaimer />
            </div>
          )}
        </main>
        <Footer open={footerOpen} setOpen={setFooterOpen} />
      </MagicBellProvider>
    </>
  )
}
