"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, BookOpen, GraduationCap, Briefcase, Globe, Info, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import placeholderData from "@/app/lib/placeholder-images.json";

export function NavHeader() {
  const logo = placeholderData.placeholderImages.find(img => img.id === 'app-logo');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-muted shadow-sm">
      <div className="container flex h-24 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
            <div className="relative h-12 w-12">
              {logo && (
                <Image 
                  src={logo.imageUrl} 
                  alt="CareerCompass Logo" 
                  fill 
                  className="object-contain"
                />
              )}
            </div>
            <span className="text-2xl font-black tracking-tight font-headline text-primary hidden lg:inline-block">
              CareerCompass
            </span>
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-10 text-base font-bold text-muted-foreground">
          <Link href="/hub" className="hover:text-primary transition-all hover:scale-105">
            Courses
          </Link>
          <Link href="/hub" className="hover:text-primary transition-all hover:scale-105">
            Universities
          </Link>
          <Link href="/hub" className="hover:text-primary transition-all hover:scale-105">
            TVET
          </Link>
          <Link href="/hub" className="hover:text-primary transition-all hover:scale-105">
            Scholarships
          </Link>
          <Link href="/quiz" className="text-primary bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10 transition-all flex items-center gap-2">
            <Compass className="h-5 w-5" /> Career Test
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex font-black text-lg hover:bg-muted" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button className="hidden sm:flex bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/quiz">Get Started</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden h-12 w-12 hover:bg-muted rounded-2xl">
                <Menu className="h-7 w-7" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] mt-4 p-4">
              <DropdownMenuItem asChild className="rounded-2xl h-12 font-bold focus:bg-primary/5">
                <Link href="/hub">Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-2xl h-12 font-bold focus:bg-primary/5">
                <Link href="/hub">Universities</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-2xl h-12 font-bold focus:bg-primary/5">
                <Link href="/hub">Scholarships</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-2xl h-12 font-black text-primary bg-primary/5 mt-2">
                <Link href="/quiz">Career Test</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-2xl h-12 font-black bg-primary text-white mt-4 justify-center">
                <Link href="/quiz">Join Now</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}