import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

import ContentWrapper from "@/components/content-wrapper";
import Disclaimer, { magicBellHandle } from "@/components/disclaimer";
import ErrorDiagnostics from "@/components/error-diagnostics";
import Footer from "@/components/footer";
import IosInstructionalStatic from "@/components/ios-instructional-static";
import Links from "@/components/links";
import PostSubscribeActions from "@/components/post-subscribe-actions";
import SeoText from "@/components/seo-text";
import Subscriber from "@/components/subscriber";
import useDeviceInfo, { DeviceInfo } from "@/hooks/useDeviceInfo";
import minVersionCheck from "@/utils/minVersionCheck";

const inter = Inter({ subsets: ["latin"] });

const resendDelay = 10 * 1000;
const enableSuccessMessage = false;

export type State =
  | { status: "idle" | "busy" | "success" }
  | { status: "error"; error: string }
  | { status: "unsupported" };

export default function Home() {
  const [footerOpen, setFooterOpen] = useState(false);
  const [canResendNotification, setCanResendNotification] = useState(false);
  const [state, setState] = useState<State>({ status: "idle" });
  const info = useDeviceInfo();

  function anticipateSubscriptionFailure(info: DeviceInfo) {
    if (info.osName === "iOS") {
      if (minVersionCheck(info.osVersion.toString(), 16, 5)) {
        if (!info.standalone) return <IosInstructionalStatic />;
      } else {
        return (
          <p className="text-center text-red-400 my-6">
            This web push notifications demo requires iOS 16.5 or later. Please
            run a software update to continue.
          </p>
        );
      }
    }
    if (info.isPrivate) {
      return (
        <p className="text-center text-red-400 my-6">
          This web push notifications demo requires a non-private browser
          window, since the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Notification"
            target="_blank"
            className="underline"
          >
            Notification API
          </a>{" "}
          is set to &quot;denied&quot; by default.
        </p>
      );
    }
    return null;
  }

  function actions(state: State) {
    if (!info) {
      return null;
    }
    if (state.status === "success" || info.subscriptionState === "subscribed") {
      return (
        <PostSubscribeActions
          interactive={canResendNotification}
          onAfterInteract={() => {
            setCanResendNotification(false);
            setTimeout(() => {
              setCanResendNotification(true);
            }, resendDelay);
          }}
          onError={(error) => {
            setState({ status: "error", error });
          }}
        />
      );
    }

    if (anticipateSubscriptionFailure(info)) {
      return anticipateSubscriptionFailure(info);
    }

    return <Subscriber state={state} setState={setState} />;
  }

  function result(state: State) {
    if (state.status === "idle" || state.status === "busy") {
      return;
    }
    if (state.status === "error") {
      return (
        <>
          <ErrorDiagnostics error={state.error}></ErrorDiagnostics>
        </>
      );
    }
    if (state.status === "success" && enableSuccessMessage) {
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
      );
    }
  }

  useEffect(() => {
    if (state.status === "error") {
      setFooterOpen(true);
    }
  }, [state.status]);

  useEffect(() => {
    if (state.status === "success") {
      setTimeout(() => {
        setCanResendNotification(true);
      }, resendDelay);
    } else if (info?.subscriptionState === "subscribed") {
      setCanResendNotification(true);
    }
  }, [state.status, info?.subscriptionState]);

  return (
    <>
      <header
        className={
          "border-primary border-opacity-50 border-b-2 leading-8 text-lg font-bold text-gray-200 py-4 bg-section text-center " +
          inter.className
        }
      >
        <h1>Web Push Notifications Demo</h1>
      </header>

      <Head>
        <title>Web Push Notifications on iOS Demo & Test</title>
        <meta
          name="description"
          content="Web push notifications demo on iOS and Android. Get the free starter template with support for iOS Safari PWA notifications."
          key="desc"
        />
        <meta
          property="og:title"
          content="Web Push Notifications on iOS Demo & Test"
        />
        <meta
          property="og:description"
          content="Web push notifications demo on iOS and Android. Get the free starter template with support for iOS Safari PWA notifications."
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
            <SeoText />
            <Disclaimer />
            <div className="mx-auto text-center mb-4">
              Learn about{" "}
              <a
                href="https://apimason.com"
                target="_blank"
                className="text-indigo-400 hover:text-indigo-300"
              >
                APImason
              </a>{" "}
              by MagicBell
            </div>
          </div>
        )}
      </main>
      <Footer open={footerOpen} setOpen={setFooterOpen} />
    </>
  );
}
