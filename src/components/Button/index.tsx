import styles from './styles.module.scss';

interface ButtonProps {
  textButton: string;
  colorText: string;
  bgColor: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
}

export function Button({ textButton, colorText, bgColor, onClick, type }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: colorText }}
      className={styles.buttonContainer}
      onClick={onClick}
      type={type}
      data-testid="pure_button"
    >
      {textButton}
    </button>
  );
}