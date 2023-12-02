import './global.css';
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';

let title =
  'dsmtech - The best tech companies and startups in the Greater Des Moines area.';
let description =
  'Discover 40+ of the best tech companies and startups in Des Moines with direct links to their careers pages.';

export const metadata = {
  metadataBase: new URL('https://dsmtech.io'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://dsmtech.io',
    siteName: 'dsmtech',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Lee Robinson',
    card: 'summary_large_image',
    image: '/opengraph-image.jpg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-gray-100">
        <nav>
          <a href="#skip" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <div className="flex justify-between items-center p-8 mx-2">
            <Link href="/" className="no-underline font-semibold">
              <h1>dsmtech</h1>
            </Link>
            <ul className="flex justify-between items-center space-x-4">
              <li>
                <Link
                  href="/about"
                  className="no-underline font-semibold text-gray-700"
                >
                  about
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/leerob/dsmtech"
                  className="no-underline font-semibold text-gray-700"
                >
                  github
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <section id="skip">{children}</section>
        <Analytics />
      </body>
    </html>
  );
}
