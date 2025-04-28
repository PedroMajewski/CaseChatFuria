import Link from 'next/link';
import { FuriaLogo } from '@/components/icons/furia-logo'; // Assuming a logo component exists

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <FuriaLogo className="h-6 w-6 text-primary" /> {/* Use the logo */}
            <span className="font-bold sm:inline-block">
              Furia Fan Zone
            </span>
          </Link>
          {/* Navigation links can be added here later */}
          {/* <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/games"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Games
            </Link>
             <Link
              href="/news"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              News
            </Link>
          </nav> */}
        </div>
        {/* Right side elements like User Profile/Login can be added here */}
      </div>
    </header>
  );
}
