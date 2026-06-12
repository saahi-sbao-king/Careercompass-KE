import type { Metadata } from 'next';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Geist, Geist_Mono } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { Toaster } from '@/components/ui/toaster';
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
  title: 'CareerCompass Kenya',
  description: 'Navigate your future with precision.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <FirebaseClientProvider>
            <FirebaseErrorListener />
            <header className="flex justify-end items-center p-4 gap-4 h-16 bg-background border-b border-border">
              <SignedOut>
                <SignInButton mode="modal" />
                <SignUpButton mode="modal">
                  <button className="bg-primary text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer hover:bg-primary/90 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </header>
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
