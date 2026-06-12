
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
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
        <body className={`${inter.variable} ${poppins.variable} font-body antialiased selection:bg-primary/20 bg-background text-foreground`} suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
