import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import api from "../../services/api";
import styles from './styles.module.scss';

type SectionItemsProps = {
  name: string,
  resourceURI: string,
};
interface HeroData {
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
    available: number,
    collectionURI: string,
    items: [],
    returned: number;
  },
  series: {
    available: number,
    collectionURI: string,
    items: [],
    returned: number;
  },
  stories: {
    available: number,
    collectionURI: string,
    items: [],
    returned: number;
  },
  events: {
    available: number,
    collectionURI: string,
    items: [],
    returned: number;
  },
  urls: [{
    type: string,
    url: string;
  }];
}

interface HeroDetailsProps {
  dataResult: HeroData[];
}

export default function HeroDetails({ dataResult }: HeroDetailsProps) {

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

            <div className={styles.sectionContent}>
              <h2 className={styles.titleSection}>Séries</h2>
              <ul>
                {
                  dataHero.series.items.map((serie: SectionItemsProps) => {
                    return (
                      <li key={serie.name}>{serie.name}</li>
                    );
                  })
                }
              </ul>
            </div>

            <div className={styles.sectionContent}>
              <h2 className={styles.titleSection}>Histórias</h2>
              <ul>
                {
                  dataHero.stories.items.map((store: SectionItemsProps) => {
                    return (
                      <li key={store.name}>{store.name}</li>
                    );
                  })
                }
              </ul>
            </div>

            <div className={styles.sectionContent}>
              <h2 className={styles.titleSection}>Histórias em quadrinhos</h2>
              <ul>
                {
                  dataHero.comics.items.map((comic: SectionItemsProps) => {
                    return (
                      <li key={comic.name}>{comic.name}</li>
                    );
                  })
                }
              </ul>
            </div>

            <div className={styles.sectionContent}>
              <h2 className={styles.titleSection}>Eventos</h2>
              <ul>
                {
                  dataHero.events.items.map((event: SectionItemsProps) => {
                    return (
                      <li key={event.name}>{event.name}</li>
                    );
                  })
                }
              </ul>
            </div>

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
    revalidate: 60 * 60 * 24 // seconds * minutes * hours (update every 24 hours)
  };
};