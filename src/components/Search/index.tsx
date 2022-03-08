import { Button } from '../Button';
import styles from './styles.module.scss';

interface SearchProps {
  placeholder?: string;
  typeInput: string,

  titleButton: string,
  colorTitle: string,
  bgColor: string,
  onClick: () => void,
}

export function Search({ placeholder, typeInput, titleButton, colorTitle, bgColor, onClick }: SearchProps) {
  return (
    <form className={styles.searchContainer} >
      <input
        placeholder={placeholder}
        className={styles.inputSearch}
        type={typeInput}
      />
      <Button
        titleButton={titleButton}
        colorTitle={colorTitle}
        bgColor={bgColor}
        onClick={() => onClick}
        type={'submit'} />
    </form>
  );
}