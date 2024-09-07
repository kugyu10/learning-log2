import { getList, getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import Script from 'next/script';
import * as gtag from '@/libs/gtag';
import RecommendArticles from '@/components/RecommendArticles';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://learning.uota-it.com/'),
  title: 'オタクの仕事を進化させるブログ',
  description: 'オタクの個性を仕事やビジネスに活かすための情報を発信しています。',
  openGraph: {
    title: 'オタクの仕事を進化させるブログ',
    description: 'オタクの個性を仕事やビジネスに活かすための情報を発信しています。',
    images: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  const recommended = await getList({ limit: 2, ids: ['about-me', 'monitor_produce'] });

  return (
    <html lang="ja">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <body>
        <Header />
        <RecommendArticles articles={recommended.contents} />
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
