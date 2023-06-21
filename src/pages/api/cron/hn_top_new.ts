import MagicBell from "magicbell"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, limitToFirst, query } from "firebase/database"
import type { NextApiRequest, NextApiResponse } from "next"
import { topics } from "@/constants/topics"

interface Request extends NextApiRequest {
  body: {}
}

type ResponseData = {
  status: string
}

type Story = {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: "story"
  url: string
}

const magicbell = new MagicBell({
  apiKey: process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
  apiSecret: process.env.MAGICBELL_API_SECRET,
})

const firebaseConfig = {
  databaseURL: "https://hacker-news.firebaseio.com",
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default async function handler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
  if (req.query.key !== process.env.VERCEL_CRON_KEY) {
    res.status(404).end()
    return
  }

  const docRef = query(ref(db, "v0/topstories"), limitToFirst(5))

  await get(docRef).then(async (snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val()
      const fullItems: Story[] = await Promise.all(
        items.map((item: number) =>
          get(ref(db, `v0/item/${item}`)).then((snapshot) => snapshot.val())
        )
      )
      fullItems.sort((a, b) => b.score - a.score)
      // TODO: check for the first un-notified item
      const firstUnNotifiedItem = fullItems[0]
      return fetch("https://api.magicbell.com/notifications", {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
          "X-MAGICBELL-API-SECRET": process.env.MAGICBELL_API_SECRET,
        },
        method: "POST",
        body: JSON.stringify({
          notification: {
            title: `(${firstUnNotifiedItem.score}) ${firstUnNotifiedItem.title}`,
            action_url: firstUnNotifiedItem.url,
            category: "default",
            topic: topics["HN Top New"].id,
            recipients: [
              {
                topic: {
                  subscribers: true,
                },
              },
            ],
          },
        }),
      }).then((response) => response.json())
    } else {
      console.log("No data available")
      return "no data"
    }
  })

  res.status(200).json({
    status: "success",
  })
}
