// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import MagicBell from "magicbell"

interface WelcomeRequest extends NextApiRequest {
  body: {
    userId: string
  }
}

type ResponseData = {
  status: string
}

const magicbell = new MagicBell({
  apiKey: process.env.NEXT_PUBLIC_MAGICBELL_API_KEY as string,
  apiSecret: process.env.MAGICBELL_API_SECRET as string,
})

export default async function handler(
  req: WelcomeRequest,
  res: NextApiResponse<ResponseData>
) {
  await magicbell.notifications.create({
    title: "Thanks for subscribing!",
    action_url: "https://magicbell.com",
    recipients: [{ email: req.body.userId }],
  })
  res.status(200).json({ status: "success" })
}
