import MagicBell from "magicbell"
import type { NextApiRequest, NextApiResponse } from "next"

interface WelcomeRequest extends NextApiRequest {
  body: {
    userId: string
  }
}

type ResponseData = {
  status: string
}

const magicbell = new MagicBell({
  apiKey: process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
  apiSecret: process.env.MAGICBELL_API_SECRET,
})

export default async function handler(
  req: WelcomeRequest,
  res: NextApiResponse<ResponseData>
) {
  await magicbell.notifications.create({
    title: "Thanks for subscribing!",
    action_url: "https://magicbell.com",
    recipients: [{ external_id: req.body.userId }],
    category: "default",
  })
  res.status(200).json({ status: "success" })
}
