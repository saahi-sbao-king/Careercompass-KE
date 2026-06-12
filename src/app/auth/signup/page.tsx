"use client";

import { SignUp } from "@clerk/nextjs";
import { NavHeader } from "@/components/nav-header";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl md:text-5xl font-black font-headline text-primary tracking-tight">
            Welcome to CareerCompass Kenya
          </h1>
          <p className="text-muted-foreground text-lg font-medium max-w-md mx-auto">
            Join thousands of students navigating their future with precision.
          </p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              card: "rounded-[40px] shadow-2xl border-none bg-card",
              headerTitle: "text-primary font-black font-headline text-3xl",
              headerSubtitle: "text-muted-foreground font-medium",
              socialButtonsBlockButton: "rounded-2xl border-2 h-14 font-black hover:bg-muted/50",
              formButtonPrimary: "bg-primary hover:bg-primary/90 h-14 rounded-2xl font-black text-lg",
              formFieldInput: "h-14 rounded-2xl border-2 focus:border-primary bg-muted/30",
              footerActionLink: "text-primary font-black hover:underline"
            }
          }}
          signInUrl="/auth/login"
        />
      </main>
    </div>
  );
}
