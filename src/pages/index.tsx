import Head from 'next/head';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import Header from '../components/Header';
import { useHeroes } from '../hooks/useHeroes';
import styles from './home.module.scss';


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

  const { handleMoreHeroes, heroes, handleSearchHeroes, handleFavoriteHero } = useHeroes();
  let valueSearch = '';

  function handleSearchHero(event) {
    valueSearch = event.target.value;
  }

  return (
    <>
      <Header />
      <Head>
        <title>Marvel Challenge</title>
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
            textButton={'Pesquisar'}
            colorText={'#FFFFFF'}
            bgColor={'#700611'}
            onClick={() => handleSearchHeroes(valueSearch)}
            type={'button'} />
        </form>
        <span id="errorSearch"></span>

        <section id='sectionHeroes'>
          {
            heroes.length !== 0 ?
              (
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
              ) :
              (
                <h3>Nenhuma informação foi encontrada para busca realizada</h3>
              )}

          <Button
            textButton={'Buscar outros heróis'}
            colorText={'#FFFFFF'}
            bgColor={'#700611'}

            onClick={handleMoreHeroes}
          />
        </section>
      </main>
    </>
  );
}