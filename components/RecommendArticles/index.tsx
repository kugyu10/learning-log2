'use client';

import { Article } from '@/libs/microcms';
import styles from './index.module.css';
import { usePathname } from 'next/navigation';
import ArticleList from '../ArticleList';

type Props = {
  articles?: Article[];
};

export default function RecommendArticles({ articles }: Props) {
  const path = usePathname();
  const isTop = path === '/';

  return isTop ? (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.header}>オススメ記事：</h3>
        <ArticleList articles={articles} />
      </div>
    </div>
  ) : (
    <></>
  );
}
