"use server";

import jwt from "jsonwebtoken";

export async function getUserToken() {
  // Replace with your actual user ID or logic to retrieve it
  const userId = "7f4baab5-0c91-44e8-8b58-5ff849535174";

  const secret = process.env.MAGICBELL_SECRET_KEY!;
  const apiKey = process.env.MAGICBELL_API_KEY!;

  const payload = {
    user_email: null,
    user_external_id: userId,
    api_key: apiKey,
  };

  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1y",
  });

  return token;
}
