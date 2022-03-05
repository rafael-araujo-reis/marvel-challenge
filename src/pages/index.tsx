import { useEffect } from 'react';
import styles from './home.module.scss';

export default function Home() {

  useEffect(() => {
    buscarHerois();
  }, []);

  async function buscarHerois() {
    const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1646471929347&apikey=e805fe9719d145ceca74a945af62118b&hash=0757bd2e4747b3e6302fe20a0c5f4bce')
        .then((res) => res.json())
        .then((dataResult) => dataResult.data.results);

      console.log('response: ', response);
      setHeroes(response);

    } catch (error) {
      console.log(`error: ${error.message}`);
    }

  }

  return (
    <main className={styles.homeContainer}>
      <h1>Hello word</h1>
      <ul>

        {
          heroes?.map((hero) => {
            return (
              <li key={hero.id}>
                <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt="" />
                <p>{hero.name}</p>
              </li>
            );
          })
        }
      </ul>

    </main>
  );
}
