# About this project

Apple released [beta](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados) support for Web Push notifications on iOS in February 2023, and made it official with the release of iOS 16.5 in [May 2023](https://www.macrumors.com/2023/05/09/apple-confirms-ios-16-5-release-date/).

This project, hosted at https://webpushtest.com, showcases these new capabilities. In addition to iOS, it can also send Web Push notifications on desktop and Android (although this is somewhat old news).

It is targeted at the end user, for whom installing a PWA and receiving a Web Push notification will likely be a new experience. As such, we have tried to include instructional information and device-specific error messages where relevant. Take a look at this Youtube short

[![Demo of WebPushTest.com on Youtube](https://img.youtube.com/vi/aIlGLE_adzc/maxresdefault.jpg)](https://www.youtube.com/watch?v=aIlGLE_adzc)

You can use the code for providing push notification support in your web/PWA apps, but you will need an API key from [MagicBell](https://www.magicbell.com). We offer a generous free tier so you can get started quickly. Apart from web-push, we offer a real-time in-app notification inbox you can add to your app in minutes.

Relevant links:

- [iOS now supports push notifications (and why you should care)](https://www.magicbell.com/blog/ios-now-supports-web-push-notifications-and-why-you-should-care)
- [Twitter thread](https://twitter.com/Matt0xley/status/1668912123702030336)
- If you'd like help, please start a [GitHub Discussion|(https://github.com/orgs/magicbell-io/discussions).

## Running locally

First, install dependencies:

```bash
npm install
```

Then, assuming you have a MagicBell account and have created a new project, obtain the NEXT_PUBLIC_MAGICBELL_API_KEY and MAGICBELL_API_SECRET from the [MagicBell](https://www.magicbell.com/) dashboard and set them as environment variables in a `.env` file at the root of this project:

```bash
NEXT_PUBLIC_MAGICBELL_API_KEY=...
MAGICBELL_API_SECRET=...
```

Then, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To observe iOS push notifications from your local development environment, you will need to expose your local server to the internet. We recommend using [ngrok](https://ngrok.com/):

```bash
ngrok http 3000
```

After visiting the resulting public url on your device, be sure to also install the app as a PWA, using the "Add to Home Screen" option in the Safari share menu.

## Important files

These will be the most relevant files to look at if you want to understand how this project works:

- https://github.com/magicbell-io/webpush-test/blob/main/src/components/subscriber.tsx
- https://github.com/magicbell-io/webpush-test/blob/main/src/services/subscriptionManager.ts
- https://github.com/magicbell-io/webpush-test/blob/main/public/manifest.json
- https://github.com/magicbell-io/webpush-test/blob/main/public/sw.js
