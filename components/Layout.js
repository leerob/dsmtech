import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout({ children, meta: pageMeta }) {
  const router = useRouter();
  const meta = {
    title:
      'dsmtech - The best tech companies and startups in the Greater Des Moines area.',
    description:
      'Discover 40+ of the best tech companies and startups in Des Moines with direct links to their careers pages.',
    cardImage: '/og.jpg',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://dsmtech.io${router.asPath}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="dsmtech" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <nav>
        <ul className="flex justify-between items-center p-8 mx-2">
          <li>
            <Link href="/">
              <a className="no-underline font-semibold">dsmtech</a>
            </Link>
          </li>
          <ul className="flex justify-between items-center space-x-4">
            <li>
              <Link href="/about">
                <a className="no-underline font-semibold text-gray-700">
                  about
                </a>
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
        </ul>
      </nav>
      {children}
    </>
  );
}
