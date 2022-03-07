import styles from './styles.module.scss';

interface CardProps {
  title: string;
  image: string;
}

export function Card({ title, image }: CardProps) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.backdrop}
        style={{ backgroundImage: image }}
      >
      </div>
      <div className={styles.titleCard}>
        <p>{title}</p>
      </div>
    </div>
  );
}