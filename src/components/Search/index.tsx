import styles from './styles.module.scss';

interface SearchProps {
  placeholder?: string;
}

export function Search({ placeholder }: SearchProps) {
  return (
    <input placeholder={placeholder} className={styles.searchContainer} />
  );
}