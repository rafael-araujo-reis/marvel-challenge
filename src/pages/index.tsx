import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button';
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
    //salvar em localstorage

    api.get('/characters')
      .then((res) => {
        setHeroes(res.data.data.results);
      })
      .catch(err => console.log(err.message));

  }, []);

  const handleMoreHeroes = useCallback(async () => {
    try {
      const offset = heroes.length;

      const response = await api.get('/characters', {
        params: {
          offset
        }
      });

      setHeroes([...heroes, ...response.data.data.results]);
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  }, [heroes]);
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