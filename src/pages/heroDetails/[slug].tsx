import { GetStaticPaths } from "next";
import Head from "next/head";
import api from "../../services/api";
import styles from './styles.module.scss';
interface Hero {
  id: number;
  name: string;
  modified: string,
  thumbnail: {
    path: string,
    extension: string;
  };
}

interface HeroProps {
  hero: Hero;
}

export default function HeroDetails(props) {
  console.log('Hero details: ', props);
  return (
    <>
      <Head>
        <title>Titulo Herói</title>
      </Head>
      <main className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <section className={styles.heroDisplay}>
            <h1 className={styles.title}>Hero name</h1>
          </section>
          <section className={styles.heroDetails}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui ipsam ea incidunt ab vel facilis, accusamus numquam sunt distinctio perferendis quod, repellendus suscipit voluptas. Labore provident rerum est dolor. Corrupti.</p>
            <ul>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, natus.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('cai no getStatic do Heroes');
  const { data } = await api.get('/characters');

  const heroes = data.data.results;

  const paths = heroes.map(hero => {
    return {
      params: {
        slug: hero.id
      }
    };
  });

  console.log('paths: ', paths);

  return {
    paths,
    fallback: 'blocking'
  };
};