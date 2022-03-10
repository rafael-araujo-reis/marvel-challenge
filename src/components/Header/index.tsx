/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer} data-testid="pure_header">
      <div className={styles.headerContent}>
        <img src="./images/logo.svg" alt="Logo Marvel" />
      </div>
    </header>
  );
}