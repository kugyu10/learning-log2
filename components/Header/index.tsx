import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/learning-log-logo.png"
          alt="魚田のラーニング・ログ"
          className={styles.logo}
          width={459}
          height={135}
          priority
        />
      </Link>
    </header>
  );
}
