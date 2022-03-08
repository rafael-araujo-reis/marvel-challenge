import styles from './styles.module.scss';

interface ButtonProps {
  titleButton: string;
  colorTitle: string;
  bgColor: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
}
export function Button({ titleButton, colorTitle, bgColor, onClick, type }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: colorTitle }}
      className={styles.buttonContainer}
      onClick={onClick}
      type={type}
    >
      {titleButton}
    </button>
  );
}