import { formatRichText } from '@/libs/utils';
import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Script from 'next/script';


type Props = {
  data: Article;
  param: string;
};

export default function Article({ data, param }: Props,) {
  const pathname = param;
  const siteUrl = `${process.env.BASE_URL}`;
  const url = `${siteUrl}articles/${pathname}`;

  console.log('data:');
  console.log(data);

  let ctaContent :string = '';
  if(data.cta){
    ctaContent = data.cta.content;
  }
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <img
          src={data.thumbnail?.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${formatRichText(data.content)}`,
        }}
      />
      
        <div className={styles.cta}>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
            __html: `${formatRichText(ctaContent)}`,
          }}
        />
        </div>
      
      <p className="btn-tweet">
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          target="_blank"
          className="twitter-share-button"
          data-show-count="false"
          data-lang="ja"
          data-url={url}
        >ツイート</a>
        <Script src="https://platform.twitter.com/widgets.js" />
      </p>
    </main>
  );
}
