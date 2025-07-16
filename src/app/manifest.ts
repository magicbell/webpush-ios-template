import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Web Push Next.js Template",
    short_name: "Web Push Template",
    description: "A minimal Web Push Next.js Starter Template using MagicBell",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b1d29",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
