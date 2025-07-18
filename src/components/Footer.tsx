export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://magicbell.com/docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Docs
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://magicbell.to/community"
        target="_blank"
        rel="noopener noreferrer"
      >
        Discuss on GitHub
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/magicbell/webpush-ios-template"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repo
      </a>
    </footer>
  );
}
