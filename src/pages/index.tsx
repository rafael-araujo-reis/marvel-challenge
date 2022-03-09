import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { useHeroes } from '../hooks/useHeroes';
import styles from './home.module.scss';

import { FaStar } from 'react-icons/fa';

interface Hero {
  id: string,
  name: string,
  thumbnail: {
    path: string,
    extension: string,
  },
  favorite?: boolean,
}

export default function Home() {

  const { handleMoreHeroes, heroes, updateDataHeroes, handleSearchHeroes } = useHeroes();
  let valueSearch = '';

  function handleFavoriteHero(hero: Hero) {

    heroes.find(element => {
      if (element.id === hero.id) {
        'favorite' in hero ? hero.favorite = !hero.favorite : hero.favorite = true;
      }
    });

    localStorage.setItem('@HeroesMarvel', JSON.stringify(heroes));
  }

  function handleSearchHero(event) {
    valueSearch = event.target.value;
  }

  return (
    <>
      <Header />
      <Head>
        <title>Marvel Challenge | Magalu</title>
      </Head>
      <main className={styles.homeContainer}>

        <form className={styles.searchContainer} >
          <input
            placeholder={'Procure por Avangers, Spider-man, Balder, entre outros...'}
            className={styles.inputSearch}
            type={'text'}
            name={'searchHero'}
            onBlur={handleSearchHero}
          />
          <Button
            titleButton={'Pesquisar'}
            colorTitle={'#FFFFFF'}
            bgColor={'#700611'}
            onClick={() => handleSearchHeroes(valueSearch)}
            type={'button'} />
        </form>

        <section id='sectionHeroes'>
          <ul className={styles.cardsContainer}>
            {
              heroes.map((hero) => {
                return (
                  <li key={hero.id}>

                    {
                      hero.favorite === true ? (
                        <FaStar
                          className={styles.starCard}
                          onClick={() => handleFavoriteHero(hero)}
                          style={{ color: '#EBA417' }}
                        />
                      ) :
                        (
                          <FaStar
                            className={styles.starCard}
                            onClick={() => handleFavoriteHero(hero)}
                          />
                        )
                    }
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
            titleButton={'Buscar outros heróis'}
            colorTitle={'#FFFFFF'}
            bgColor={'#700611'}

            onClick={handleMoreHeroes}
          />
        </section>
      </main>
    </>
  );
}