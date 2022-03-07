import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { useHeroes } from '../hooks/useHeroes';
import styles from './home.module.scss';

interface Hero {
  id: number;
  name: string;
  modified: string,
  thumbnail: {
    path: string,
    extension: string;
  };
}

export default function Home() {

  const { handleMoreHeroes, heroes } = useHeroes();

  return (
    <>
      <Header />
      <Head>
        <title>Marvel Challenge | Magalu</title>
      </Head>
      <main className={styles.homeContainer}>
        <ul className={styles.cardsContainer}>
          {
            heroes.map((hero) => {
              return (
                <li key={hero.id}>
                  <Link href={`/heroDetails/${hero.id}`}>
                    <a>
                      <Card
                        title={hero.name}
                        image={`url(${hero.thumbnail.path}.${hero.thumbnail.extension})`}
                      />
                    </a>
                  </Link>
                </li>
              );
            })
          }

        </ul>
        <Button
          titleButton={'Buscar mais heróis'}
          colorTitle={'#FFFFFF'}
          bgColor={'#700611'}

          onClick={handleMoreHeroes}
        />
      </main>
    </>
  );
}