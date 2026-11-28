import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  metadataBase: new URL('https://gdg-rvce-website.vercel.app'),
  title: {
    default: 'GDG on Campus RVCE',
    template: '%s | GDG on Campus RVCE',
  },
  description:
    'A student-run developer community in Bengaluru. Study Jams, hackathons and sessions with people who like building things.',
  openGraph: {
    title: 'GDG on Campus RVCE',
    description:
      'A student-run developer community in Bengaluru. Study Jams, hackathons, interactive 3D Builder Pass & sessions with people who like building things.',
    url: 'https://gdg-rvce-website.vercel.app',
    siteName: 'GDG on Campus RVCE',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG on Campus RVCE',
    description:
      'A student-run developer community in Bengaluru. Study Jams, hackathons, interactive 3D Builder Pass & sessions with people who like building things.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}