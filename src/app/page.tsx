"use client";

import { useState } from "react";
import WebPushButton from "@magicbell/react/webpush-button";
import Loading from "@/components/loading";
import Logo from "@/components/logo";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  // Replace with your actual user ID or logic to retrieve it
  const userId = "7f4baab5-0c91-44e8-8b58-5ff849535174";

  const [formData, setFormData] = useState({ title: "", content: "" });

  const sendNotification = async () => {
    const res = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        externalId: userId,
        title: formData.title,
        content: formData.content,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="flex items-center mb-12">
        <a href="https://magicbell.com" target="_blank">
          <Logo />
        </a>
      </span>
      <h1 className="text-2xl font-medium">Web Push Notifications Template</h1>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <div className="w-full inline-flex items-center justify-between rounded-sm py-0 px-1 min-w-3xs transition bg-default hover:bg-hover active:bg-active focus:bg-active focus-within:bg-active h-10">
            <input
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              name="title"
              id="title"
              placeholder="Notification title"
              className="border-0 m-0 outline-none w-full h-full px-1"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="text-sm">
            Content
          </label>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            name="Content"
            id="content"
            placeholder="Content"
            className="w-full inline-flex items-center justify-between rounded-sm p-3 min-w-3xs transition bg-default hover:bg-hover active:bg-active focus:bg-active focus-within:bg-active min-h-10 border-0 m-0 outline-none h-full"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <WebPushButton
          renderLabel={({ status, error }) => {
            switch (status) {
              case "loading":
                return <Loading />;
              case "error":
                return `Error: ${error}`;
              case "success":
                return "Unsubscribe";
              default:
                return "Subscribe";
            }
          }}
          serviceWorkerPath="/sw.js"
          className="inline-flex justify-center items-center cursor-pointer rounded-sm px-4 h-10 bg-primary hover:bg-primary-hover transition w-full"
        />
        <button
          onClick={sendNotification}
          className="cursor-pointer rounded-sm px-4 h-10 bg-default hover:bg-hover transition w-full disabled:opacity-65 disabled:cursor-not-allowed"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
}
