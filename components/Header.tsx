import Logo from "./Logo";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "./ModeToggle";
import { LangToggle } from "./LangToggle";

export default function Header() {
  return (
    <header className="container mx-auto px-4 lg:px-5 py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-x-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="flex items-center gap-x-3">
          <ModeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
