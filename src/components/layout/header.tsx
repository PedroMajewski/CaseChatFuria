"use client"

import Link from 'next/link';
import { User, MessageCircleIcon, CameraIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';

export default function Header() {

  const { user, loading } = useAuth();

  return (
    <header
      id="headerPrincipal"
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/0 
                 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between h-20 px-4 
                 sm:h-20 sm:px-8 md:px-12"
    >
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/assets/FuriaEsportsLogo.png"
            alt="Furia Logo"
            width={30}
            className="mr-2"
          />
          <span className="font-bold uppercase text-lg sm:text-xl">
            Furia CS Fan Zone
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex space-x-4">
        <Link href="/">
          <span className="text-sm sm:text-base hover:text-primary duration-200 hover:scale-150">Rolando Agora</span>
        </Link>
        <Link href="/">
          <span className="text-sm sm:text-base hover:text-primary duration-200 hover:scale-150">Fale com o Time</span>
        </Link>
        <Link href="/">
          <span className="text-sm sm:text-base hover:text-primary duration-200 hover:scale-150">NewsLetter</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <Link href="/" className="hover:text-primary duration-200 hover:scale-110">
          <MessageCircleIcon size={20} />
        </Link>
        <Link href="/" className="hover:text-primary duration-200 hover:scale-110">
          <CameraIcon size={20} />
        </Link>
        {!user ? (
          <Link href={"/login"} className="hover:text-primary duration-200 hover:scale-110"><User size={20} /></Link>
        ) : (
          <Link href={"/login"} className="hover:text-primary duration-200 hover:scale-110"><User size={20} /></Link>
        )}
        {!user && (
          <Link href={"/login"}><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Log In / Sign Up</Button></Link>
        )}
      </div>
    </header>
  );
}
