<div align="center"> 
<a href="https://magicbell.com">
    <img src="public/logo-128x128.svg">
    <h1>MagicBell</h1>
</a>

<a href="https://magicbell.com/docs">
    <img alt="Read the MagicBell Docs" src="https://img.shields.io/badge/Read%20the%20docs-23283B.svg?style=for-the-badge">
</a>
<a href="https://magicbell.to/community">
    <img alt="Discuss on GitHub" src="https://img.shields.io/badge/Discuss%20on%20GitHub-black.svg?style=for-the-badge&logo=github&labelColor=000000&logoWidth=20">
</a>
</div>

## Web Push Template

A minimal Next.js starter template for building Web Push Notification services with MagicBell.

### Getting Started

Clone the repository and run the development server:

```bash
npm run dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

> [!NOTE]
> The development server is launched with https to ensure the notifications are visible locally.

To start sending web push notifications you need to be signed in to your [MagicBell](https://magicbell.com) account.

1. Rename the `.env.example` file to `.env`.
2. [Obtain your API Key and your Secret Key from the dashboard.](https://app.magicbell.com/projects/_/settings/user-auth)
3. In your `.env` file update the value of `MAGICBELL_API_KEY` and `MAGICBELL_SECRET_KEY` to your API Key and Secret Key respectively.
4. [Get the Project Token from the dashboard.](https://app.magicbell.com/projects/_/settings/project-auth)
5. In your `.env` file update the value of `MAGICBELL_PROJECT_TOKEN` to your Project Token.

Finally, replace the `userId` in `src/app/auth.ts` and `src/app/page.tsx` to make sure you're sending notifications to the correct user.

> [!TIP]
> You can find [detailed instructions on authentication in the MagicBell Docs](https://magicbell.com/docs/api/authentication).

## Learn More

- [MagicBell Docs](https://magicbell.com/docs)

Please post any questions, feedback, or feature requests to [GitHub Discussions](https://magicbell.to/community).
