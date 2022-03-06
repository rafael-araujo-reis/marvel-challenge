import styles from './styles.module.scss';

interface ButtonProps {
  titleButton: string;
  colorTitle: string;
  bgColor: string;
  icon?: string;
  onClick: () => void;
}
export function Button({ titleButton, colorTitle, bgColor, onClick }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: colorTitle }}
      className={styles.buttonContainer}
      onClick={onClick}
    >
      {titleButton}
    </button>
  );
}