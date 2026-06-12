"use client";

import { SignUp } from "@clerk/nextjs";
import { NavHeader } from "@/components/nav-header";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />
      <main className="flex-1 flex items-center justify-center p-4">
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
          forceRedirectUrl="/dashboard"
        />
      </main>
    </div>
  );
}
