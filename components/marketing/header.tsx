import Logo from "../common/logo";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "../common/mode-toggle";
import { LangToggle } from "../common/lang-toggle";
import { AuthButton } from "../auth/auth-button";

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
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
