"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import placeholderData from "@/app/lib/placeholder-images.json";

export function NavHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const logo = placeholderData.placeholderImages.find(img => img.id === 'app-logo');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-muted shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
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
          <Link href="/" className="hover:text-primary transition-all">Home</Link>
          <Link href="/hub" className="hover:text-primary transition-all">Careers</Link>
          <Link href="/hub" className="hover:text-primary transition-all">Universities</Link>
          <Link href="/hub" className="hover:text-primary transition-all">Scholarships</Link>
          <Link href="/quiz?type=PIA" className="hover:text-primary transition-all">PIA Test</Link>
          <Link href="/quiz?type=MI" className="hover:text-primary transition-all">MI Test</Link>
          <Link href="/hub" className="hover:text-primary transition-all">Resources</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full h-10 w-10 hover:bg-muted"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" className="hidden sm:flex font-bold hover:bg-muted" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button className="hidden sm:flex bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-white" asChild>
            <Link href="/quiz?type=PIA">Get Started</Link>
          </Button>

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
                <Link href="/hub">Careers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                <Link href="/quiz?type=PIA">PIA Test</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl h-10 font-medium">
                <Link href="/quiz?type=MI">MI Test</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl h-10 font-bold bg-primary text-white mt-2 justify-center">
                <Link href="/quiz?type=PIA">Start Now</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
