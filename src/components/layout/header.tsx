"use client"

import Link from 'next/link';
import { User, MessageCircleIcon, CameraIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { getAuth, signOut } from 'firebase/auth';
import { InstagramIcon } from 'lucide-react';
import { ShoppingBagIcon } from 'lucide-react';



export default function Header() {
  const { user, loading } = useAuth();

  const handleLogout = async function Logout() {
    const auth = getAuth();
    try{
      await signOut(auth);
      toast({
        title: "Saindo...",
        description: `Logout Realizado!`,
      });
    }catch(error){
      toast({
        title: "Erro ao realizar logout :(",
        description: `Não foi possível sair do Sistema, tente novamente!`,
        variant: "destructive"
      });
    }
  }

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

      <div className="flex items-center space-x-4">
        <Link href="/https://www.furia.gg/" className="hover:text-primary duration-200 hover:scale-110">
          <ShoppingBagIcon size={20} />
        </Link>
        <Link href="https://www.instagram.com/furiagg/" className="hover:text-primary duration-200 hover:scale-110">
          <InstagramIcon size={20} />
        </Link>
        {!user ? (
          <Link href={"/login"} className="hover:text-primary duration-200 hover:scale-110"><User size={20} /></Link>
        ) : (
          <Link href={"/login"} ><User size={20} /></Link>
        )}
        {!user ? (
          <Link href={"/login"}><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Log In / Sign Up</Button></Link>
        ) : (
          <Button onClick={handleLogout} className="bg-secondary/95 hover:bg-secondary/65 text-primary-foreground">Log Out</Button>
        )}
      </div>
    </header>
  );
}
