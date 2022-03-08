import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { useHeroes } from '../hooks/useHeroes';
import styles from './home.module.scss';

export default function Home() {

  const { handleMoreHeroes, heroes } = useHeroes();

  function heroSearch() {
    console.log('pesquisar');
  }

  return (
    <>
      <Header />
      <Head>
        <title>Marvel Challenge | Magalu</title>
      </Head>
      <main className={styles.homeContainer}>

        <Search
          placeholder={'Procure por Avangers, Spider-man, Balder ...'}
        />
        <Button
          titleButton={'Pesquisar'}
          colorTitle={'#FFFFFF'}
          bgColor={'#700611'}
          onClick={heroSearch} />

        <ul className={styles.cardsContainer}>
          {
            heroes.map((hero) => {
              return (
                <li key={hero.hero.id}>
                  <Link href={`/heroDetails/${hero.hero.id}`}>
                    <a>
                      <Card
                        title={hero.hero.name}
                        image={`url(${hero.hero.thumbnail.path}.${hero.hero.thumbnail.extension})`}
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