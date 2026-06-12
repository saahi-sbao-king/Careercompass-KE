
"use client";

import Link from "next/link";
import { GraduationCap, Menu, BookOpen, BarChart3, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1.5 text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight font-headline text-primary hidden sm:inline-block">
              CareerCompass Kenya
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/quiz" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            Diagnostic
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/hub" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4" />
            KUCCPS Hub
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" className="hidden sm:flex" asChild>
            <Link href="/quiz">Start Quiz</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/quiz">MI Diagnostic</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/hub">KUCCPS Hub</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
