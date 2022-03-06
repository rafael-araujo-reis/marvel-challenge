import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { api } from '../services/api';
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

  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {

    getHeroes();
    console.log('heroes: ', heroes);

  }, []);

  async function getHeroes() {

    try {
      const ts = Math.floor(Date.now());
      const apiKey = 'e805fe9719d145ceca74a945af62118b';
      const hash = '0757bd2e4747b3e6302fe20a0c5f4bce';

      const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1646471929347&apikey=e805fe9719d145ceca74a945af62118b&hash=0757bd2e4747b3e6302fe20a0c5f4bce`)
        .then((res) => res.json())
        .then((dataResult) => dataResult.data.results);

      console.log('response: ', response);
      setHeroes(response);

    } catch (error) {
      console.log(`error: ${error.message}`);
    }

  }

  return (
    <>
      <Head>
        <title>Marvel Challenge | Magalu</title>
      </Head>
      <main className={styles.homeContainer}>
        <ul className={styles.cardsContainer}>
          {
            heroes?.map((hero) => {
              return (
                <li key={hero.id}>
                  <Link href={`/heroDetails/${hero.id}`}>
                    <a>
                      <div className={styles.cardContent}>
                        <div className={styles.backdrop}
                          style={{ backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})` }}
                        >
                        </div>
                        <div className={styles.titleCard}>
                          <p>{hero.name}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </main>
    </>

  );
}
