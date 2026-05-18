import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border/50">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="heading-serif text-xl tracking-tight text-foreground transition-colors hover:text-accent"
        >
          philolab
        </Link>
        <Link
          href="/about"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          about
        </Link>
      </div>
    </header>
  );
}
