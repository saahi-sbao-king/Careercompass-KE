import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerCompass Kenya | CBE Guidance Platform',
  description: 'Precision career guidance for Kenyan students in the Competency-Based Education system.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
