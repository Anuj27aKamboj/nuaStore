import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { getProductVariants } from '../../utils/variants';
import { useCart } from '../../context/CartContext';
import VariantSelector from '../../components/VariantSelector/VariantSelector';
import QuantityPicker from '../../components/QuantityPicker/QuantityPicker';
import styles from './ProductDetail.module.scss';

export default function ProductDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { product, loading, error } = useProduct(id);
  const { dispatch } = useCart();

  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [selectedColour, setSelectedColour] = useState(searchParams.get('colour') || '');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '');

  const variants = product ? getProductVariants(product.id, product.category) : null;

  // Set default colour and size once product loads
  useEffect(() => {
    if (!variants) return;
    if (!selectedColour) setSelectedColour(variants.colours[0].name);
    if (!selectedSize) {
      const first = variants.sizes.find((s) => s.status !== 'sold-out');
      if (first) setSelectedSize(first.label);
    }
  }, [product?.id]);

  // Keep URL in sync with selected variant
  useEffect(() => {
    if (selectedColour && selectedSize) {
      setSearchParams({ colour: selectedColour, size: selectedSize }, { replace: true });
    }
  }, [selectedColour, selectedSize]);

  function handleAddToCart() {
    if (!product || !selectedColour || !selectedSize) return;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        colour: selectedColour,
        size: selectedSize,
        quantity,
      },
    });
    setAdded(true);
    dispatch({ type: 'TOGGLE_DRAWER' });
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <main className={styles.detail}><p className={styles.detail__status}>Loading...</p></main>;
  if (error || !product) return <main className={styles.detail}><p className={styles.detail__error}>{error}</p></main>;

  const isSoldOut = variants?.sizes.find((s) => s.label === selectedSize)?.status === 'sold-out';

  // Simulate 3 thumbnails using the same image (API only provides one)
  const thumbnails = [product.image, product.image, product.image];

  return (
    <main className={styles.detail}>
      <div className={`container ${styles.detail__grid}`}>

        {/* Images */}
        <div className={styles.detail__media}>
          <div className={styles.detail__main_img}>
            <img src={thumbnails[activeThumb]} alt={product.title} />
            {variants?.isOnSale && <span className={styles.detail__sale_badge}>Sale</span>}
          </div>
          <div className={styles.detail__thumbs}>
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                className={`${styles.detail__thumb} ${activeThumb === i ? styles['detail__thumb--active'] : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={thumb} alt={`View ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.detail__info}>
          <p className={styles.detail__category}>{product.category}</p>
          <h1 className={styles.detail__name}>{product.title}</h1>

          <p className={styles.detail__rating}>
            {'★'.repeat(Math.round(product.rating.rate))}{'☆'.repeat(5 - Math.round(product.rating.rate))}
            &nbsp;({product.rating.count} reviews)
          </p>

          <div className={styles.detail__price_row}>
            <span className={styles.detail__price}>${product.price.toFixed(2)}</span>
            {variants?.isOnSale && variants.originalPrice && (
              <span className={styles.detail__original}>${variants.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {variants && (
            <VariantSelector
              colours={variants.colours}
              sizes={variants.sizes}
              selectedColour={selectedColour}
              selectedSize={selectedSize}
              onColourChange={setSelectedColour}
              onSizeChange={setSelectedSize}
            />
          )}

          <div className={styles.detail__actions}>
            <QuantityPicker value={quantity} onChange={setQuantity} disabled={!!isSoldOut} />
            <button
              className={styles.detail__atc}
              onClick={handleAddToCart}
              disabled={!!isSoldOut}
            >
              {isSoldOut ? 'Sold Out' : added ? '✓ Added to cart' : 'Add to Cart'}
            </button>
          </div>

          <div className={styles.detail__description}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
        </div>

      </div>
    </main>
  );
}
