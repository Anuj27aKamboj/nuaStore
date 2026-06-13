import styles from './QuantityPicker.module.scss';

interface Props {
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

export default function QuantityPicker({ value, onChange, disabled = false }: Props) {
  return (
    <div className={styles.qty}>
      <button onClick={() => onChange(value - 1)} disabled={disabled || value <= 1}>−</button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} disabled={disabled || value >= 5}>+</button>
    </div>
  );
}
