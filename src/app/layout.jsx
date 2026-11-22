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
  title: 'GDG on Campus RVCE',
  description: 'A student-run developer community in Bengaluru. Study Jams, hackathons and sessions with people who like building things.',
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