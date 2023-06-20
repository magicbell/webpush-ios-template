import MagicBell from "magicbell"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, limitToFirst, query } from "firebase/database"
import type { NextApiRequest, NextApiResponse } from "next"

interface WelcomeRequest extends NextApiRequest {
  body: {
    userId: string
  }
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
  req: WelcomeRequest,
  res: NextApiResponse<ResponseData>
) {
  const docRef = query(ref(db, "v0/topstories"), limitToFirst(30))

  await get(docRef).then(async (snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val()
      const fullItems: Story[] = await Promise.all(
        items.map((item: number) =>
          get(ref(db, `v0/item/${item}`)).then((snapshot) => snapshot.val())
        )
      )
      const randomItem = fullItems[Math.floor(Math.random() * fullItems.length)]
      return magicbell.notifications.create({
        title: `(${randomItem.score}) ${randomItem.title}`,
        content: randomItem.url,
        action_url: randomItem.url,
        recipients: [{ external_id: req.body.userId }],
        category: "default",
      })
    } else {
      console.log("No data available")
    }
  })

  res.status(200).json({ status: "success" })
}
