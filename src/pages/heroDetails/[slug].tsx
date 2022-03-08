import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import api from "../../services/api";
import styles from './styles.module.scss';

type section = {
  available: number,
  collectionURI: string,
  items: [],
  returned: number;
};
interface Hero {
  id: number,
  name: string,
  description: string,
  modified: string,
  thumbnail: {
    path: string,
    extension: string;
  },
  resourceURI: string,
  comics: {
    section: section;
  },
  series: {
    section: section;
  },
  stories: {
    section: section;
  },
  events: {
    section: section;
  },
  urls: [{
    type: string,
    url: string;
  }];
}

interface HeroDetailsProps {
  dataResult: Hero[];
}

export default function HeroDetails({ dataResult }: HeroDetailsProps) {
  console.log('Hero details: ', dataResult[0]);

  const dataHero = dataResult[0];
  const sections = ['comics', 'events', 'series', 'stories'];

  return (
    <>
      <Head>
        <title>{dataHero.name}</title>
      </Head>
      <main className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <section className={styles.heroDisplay}
            style={{ backgroundImage: `url(${dataHero.thumbnail.path}.${dataHero.thumbnail.extension})` }}>
            <h1 className={styles.title}>{dataHero.name}</h1>
          </section>

          <section className={styles.heroDetails}>
            <p>{dataHero.description}</p>

            {

            }

          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/characters');

  const heroes = data.data.results;

  const paths = heroes.map(hero => {
    return {
      params: {
        slug: `${hero.id}`
      }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const { data } = await api.get(`/characters/${slug}`);
  const dataResult = data.data.results;

  return {
    props: {
      dataResult
    },
    revalidate: 1
    // revalidate: 60 * 60 * 24 // seconds * minutes * hours (update every 24 hours)
  };
};