export default function SeoText() {
  return (
    <section
      className="text-center my-8 grid items-center justify-center gap-x-4 gap-y-8 bg-section p-4 max-w-sm mx-auto"
      style={{}}
    >
      <h2
        className="text-center h-12 uppercase text-xs flex items-center justify-center"
        style={{ letterSpacing: "2px" }}
      >
        About The Web Push Notifications Demo
      </h2>
      <section className="w-full max-w-xs mx-auto">
        <p>
          This is a demo of standards based web-push notifications on all
          platforms, including iOS. We don't use any personal information (not
          even Device ID), and utilize the Hacker News dataset to demo one-off
          or scheduled notifications. The code is open source and we encourage
          you to use it for your product! If you are looking for a hosted
          solution, you will love our product{" "}
          <a href="https://magicbell.com">MagicBell</a>!
        </p>
      </section>
    </section>
  );
}
