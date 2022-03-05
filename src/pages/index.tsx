import { useEffect } from 'react';
import styles from './home.module.scss';

export default function Home() {

  useEffect(() => {
    buscarHerois();
  }, []);

  async function buscarHerois() {
    const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1646471929347&apikey=e805fe9719d145ceca74a945af62118b&hash=0757bd2e4747b3e6302fe20a0c5f4bce')
      .then((res) => res.json());
    const dataResult = response.data.results;

    console.log(dataResult);
  }

  return (
    <main className={styles.homeContainer}>
      <h1>Hello word</h1>
    </main>
  );
}
