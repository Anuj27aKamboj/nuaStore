import styles from './VariantSelector.module.scss';

interface Colour {
  name: string;
  hex: string;
}

interface Size {
  label: string;
  status: 'available' | 'low-stock' | 'sold-out';
}

interface Props {
  colours: Colour[];
  sizes: Size[];
  selectedColour: string;
  selectedSize: string;
  onColourChange: (c: string) => void;
  onSizeChange: (s: string) => void;
}

export default function VariantSelector({
  colours, sizes, selectedColour, selectedSize, onColourChange, onSizeChange,
}: Props) {
  return (
    <div className={styles.variants}>
      <div className={styles.variants__group}>
        <p className={styles.variants__label}>Colour: <strong>{selectedColour}</strong></p>
        <div className={styles.variants__swatches}>
          {colours.map((c) => (
            <button
              key={c.name}
              className={`${styles.variants__swatch} ${selectedColour === c.name ? styles['variants__swatch--active'] : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => onColourChange(c.name)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className={styles.variants__group}>
        <p className={styles.variants__label}>Size</p>
        <div className={styles.variants__sizes}>
          {sizes.map((s) => (
            <button
              key={s.label}
              className={`
                ${styles.variants__size}
                ${selectedSize === s.label ? styles['variants__size--active'] : ''}
                ${s.status === 'sold-out' ? styles['variants__size--soldout'] : ''}
                ${s.status === 'low-stock' ? styles['variants__size--lowstock'] : ''}
              `}
              onClick={() => s.status !== 'sold-out' && onSizeChange(s.label)}
              disabled={s.status === 'sold-out'}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className={styles.variants__hint}>
          <span style={{ color: '#d4a017' }}>●</span> Low stock &nbsp;
          <span style={{ color: '#aaa' }}>●</span> Sold out (crossed out)
        </p>
      </div>
    </div>
  );
}
