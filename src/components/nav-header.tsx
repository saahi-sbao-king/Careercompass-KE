"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, BookOpen, GraduationCap, Briefcase, Globe, Info } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              {logo && (
                <Image 
                  src={logo.imageUrl} 
                  alt="CareerCompass Kenya Logo" 
                  fill 
                  className="object-contain"
                />
              )}
            </div>
            <span className="text-xl font-bold tracking-tight font-headline text-primary hidden lg:inline-block">
              CareerCompass Kenya
            </span>
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <Link href="/hub" className="hover:text-primary transition-colors flex items-center gap-2">
            Courses
          </Link>
          <Link href="/hub" className="hover:text-primary transition-colors flex items-center gap-2">
            Universities
          </Link>
          <Link href="/hub" className="hover:text-primary transition-colors flex items-center gap-2">
            TVET
          </Link>
          <Link href="/hub" className="hover:text-primary transition-colors flex items-center gap-2">
            Scholarships
          </Link>
          <Link href="/quiz" className="text-primary hover:text-secondary transition-colors flex items-center gap-2">
            Career Test
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-2">
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:flex font-bold" asChild>
            <Link href="/quiz">Login</Link>
          </Button>
          <Button className="hidden sm:flex bg-primary hover:bg-primary/90 rounded-xl px-6 font-bold" asChild>
            <Link href="/quiz">Sign Up</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg mt-2">
              <DropdownMenuItem asChild>
                <Link href="/hub" className="font-medium">Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/hub" className="font-medium">Universities</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/hub" className="font-medium">Scholarships</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/quiz" className="font-bold text-primary">Career Test</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="font-medium">Resources</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/quiz" className="font-bold">Sign Up</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}