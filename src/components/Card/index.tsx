import styles from './styles.module.scss';

interface CardProps {
  title: string;
  image: string;
}

export function Card({ title, image }: CardProps) {
  return (
    <div className={styles.cardContainer}>

    </div>
  );
}