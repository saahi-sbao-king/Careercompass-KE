
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NavHeader } from "@/components/nav-header";
import { Loader2, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Firebase Auth implementation would go here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Firebase Google Auth implementation would go here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <NavHeader />
      <main className="container flex items-center justify-center px-4 py-16 mx-auto">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[40px] overflow-hidden bg-card">
          <CardHeader className="p-10 pb-6 text-center space-y-2">
             <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
            <CardTitle className="text-3xl font-black font-headline text-primary tracking-tight">Create Account</CardTitle>
            <CardDescription className="text-lg font-medium text-muted-foreground">Start your precision career journey today</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0 space-y-6">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                  <Input id="name" type="text" placeholder="John Doe" className="pl-12 h-14 rounded-2xl border-2 focus:border-primary bg-muted/30" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-12 h-14 rounded-2xl border-2 focus:border-primary bg-muted/30" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Create Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                  <Input id="password" type="password" className="pl-12 h-14 rounded-2xl border-2 focus:border-primary bg-muted/30" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Get Started"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-black tracking-widest">Or sign up with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-14 rounded-2xl font-black flex items-center justify-center gap-3 border-2 hover:bg-muted/50 transition-all" onClick={handleGoogleSignUp} disabled={isLoading}>
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="p-10 pt-0 justify-center">
            <p className="text-sm text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-black hover:underline inline-flex items-center gap-1">Sign in instead <ArrowRight className="h-3 w-3" /></Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
