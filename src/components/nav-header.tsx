
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, LogOut, User as UserIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderData from "@/app/lib/placeholder-images.json";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export function NavHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const logo = placeholderData.placeholderImages.find(img => img.id === 'app-logo');
  const headerBg = placeholderData.placeholderImages.find(img => img.id === 'header-bg');
  
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-muted shadow-sm bg-cover bg-center"
      style={headerBg ? { backgroundImage: `url(${headerBg.imageUrl})` } : {}}
    >
      <div className="w-full bg-background/80 backdrop-blur-lg">
        <div className="container flex h-20 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              <div className="relative h-10 w-10">
                {logo && (
                  <Image 
                    src={logo.imageUrl} 
                    alt="CareerCompass Logo" 
                    fill 
                    className="object-contain"
                  />
                )}
              </div>
              <span className="text-xl font-bold tracking-tight font-headline text-primary hidden lg:inline-block">
                CareerCompass
              </span>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-all text-foreground">Home</Link>
            <Link href="/hub" className="hover:text-primary transition-all text-foreground">Universities</Link>
            <Link href="/quiz?type=PIA" className="hover:text-primary transition-all text-foreground">PIA Test</Link>
            <Link href="/quiz?type=MI" className="hover:text-primary transition-all text-foreground">MI Test</Link>
            <Link href="/dashboard" className="hover:text-primary transition-all text-foreground">Dashboard</Link>
            <Link href="/admin" className="hover:text-primary transition-all text-foreground">Analytics</Link>
            <Link href="/faqs" className="hover:text-primary transition-all text-foreground">FAQs</Link>
          </nav>

          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || ""} />
                          <AvatarFallback className="bg-primary text-white font-bold">
                            {user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-2xl shadow-xl mt-2 p-2" align="end">
                      <DropdownMenuLabel className="font-headline font-bold px-3 py-2">
                        <p className="text-sm truncate">{user.email}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Student Account</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="rounded-xl h-11 cursor-pointer">
                        <Link href="/dashboard" className="flex items-center">
                          <UserIcon className="mr-3 h-4 w-4 text-primary" />
                          <span className="font-bold">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl h-11 cursor-pointer">
                        <Link href="/dashboard" className="flex items-center">
                          <Settings className="mr-3 h-4 w-4 text-primary" />
                          <span className="font-bold">Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="rounded-xl h-11 cursor-pointer text-destructive focus:text-destructive">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-bold">Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:inline-block text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                      Log In
                    </Link>
                    <Button className="hidden sm:flex bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 text-white" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden h-10 w-10 hover:bg-muted rounded-xl">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl mt-4 p-2">
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/hub">Universities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/quiz?type=PIA">PIA Test</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/quiz?type=MI">MI Test</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                  <Link href="/admin">Analytics</Link>
                </DropdownMenuItem>
                {!user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-xl h-10 font-bold bg-primary text-white mt-2 justify-center">
                      <Link href="/signup">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
