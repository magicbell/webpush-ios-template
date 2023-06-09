declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAGICBELL_API_KEY: string
      MAGICBELL_API_SECRET: string
    }
  }
}

export {}
