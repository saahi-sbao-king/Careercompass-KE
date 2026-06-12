
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased selection:bg-primary/20 bg-background text-foreground" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
