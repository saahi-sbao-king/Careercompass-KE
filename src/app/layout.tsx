import type { Metadata } from 'next';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CareerCompass Kenya | Navigate Your Future',
  description: 'Precision career guidance for Kenyan students. Find careers, courses, and scholarships tailored for you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#1E293B',
          colorText: 'white',
        }
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 bg-background text-foreground`} suppressHydrationWarning>
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-[60]">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-bold hover:text-primary transition-colors">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-primary text-white rounded-full font-bold text-sm h-10 px-6 cursor-pointer hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-xl"
                  }
                }}
              />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
