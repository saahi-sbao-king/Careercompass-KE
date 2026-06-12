
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to confirm your registration.",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "An error occurred during signup.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md border-none shadow-card rounded-[32px] bg-card overflow-hidden">
          <CardHeader className="p-10 pb-6 text-center space-y-2">
            <CardTitle className="text-3xl font-bold font-headline text-primary">Join CareerCompass</CardTitle>
            <CardDescription className="text-lg">
              Start your journey to a brighter future.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0">
            <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3 items-center">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
              <p className="text-xs font-bold text-primary uppercase tracking-tight">Welcome to CareerCompass Kenya</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Saddiq Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="pl-12 h-12 rounded-xl bg-background border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-12 rounded-xl bg-background border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pl-12 h-12 rounded-xl bg-background border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg group" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                Create Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="p-10 pt-0 flex flex-col items-center border-t border-muted/20 bg-muted/5">
            <p className="text-muted-foreground text-sm font-medium mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
