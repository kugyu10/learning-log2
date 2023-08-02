import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';
import Script from "next/script";
import * as gtag from "@/libs/gtag";

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://learning.uota-it.com/'),
  title: '魚田のラーニング・ログ',
  description: '魚田じゅんの日々のインプットの記録です',
  openGraph: {
    title: '魚田のラーニング・ログ',
    description: '魚田じゅんの日々のインプットの記録です',
    images: '/learning-log-logo.png',
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
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
