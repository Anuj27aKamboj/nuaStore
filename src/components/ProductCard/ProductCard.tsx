import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { getProductVariants } from '../../utils/variants';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();
  const { colours, sizes, isOnSale, originalPrice } = getProductVariants(product.id, product.category);

  const defaultColour = colours[0].name;
  const firstAvailableSize = sizes.find((s) => s.status !== 'sold-out');
  const allSoldOut = sizes.every((s) => s.status === 'sold-out');

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!firstAvailableSize) return;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        colour: defaultColour,
        size: firstAvailableSize.label,
        quantity: 1,
      },
    });
    dispatch({ type: 'TOGGLE_DRAWER' });
  }

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <div className={styles.card__img_wrap}>
          <img src={product.image} alt={product.title} loading="lazy" />
          {isOnSale && <span className={styles.card__badge}>Sale</span>}
        </div>
      </Link>

      <div className={styles.card__body}>
        <p className={styles.card__category}>{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <p className={styles.card__title}>{product.title}</p>
        </Link>

        <div className={styles.card__price_row}>
          <span className={styles.card__price}>${product.price.toFixed(2)}</span>
          {isOnSale && originalPrice && (
            <span className={styles.card__original}>${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          className={styles.card__atc}
          onClick={handleQuickAdd}
          disabled={allSoldOut}
        >
          {allSoldOut ? 'Sold Out' : 'Quick Add'}
        </button>
      </div>
    </div>
  );
}
