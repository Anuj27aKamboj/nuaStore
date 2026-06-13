import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.scss';

export default function CartDrawer() {
  const { state, dispatch } = useCart();
  const { items, isOpen } = state;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => dispatch({ type: 'CLOSE_DRAWER' })} />
      )}

      <div className={`${styles.drawer} ${isOpen ? styles['drawer--open'] : ''}`}>
        <div className={styles.drawer__header}>
          <h2>Cart ({items.length})</h2>
          <button onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}>✕</button>
        </div>

        <div className={styles.drawer__body}>
          {items.length === 0 && <p className={styles.drawer__empty}>Your cart is empty.</p>}

          {items.map((item) => (
            <div key={`${item.productId}-${item.colour}-${item.size}`} className={styles.drawer__item}>
              <img src={item.image} alt={item.title} />
              <div className={styles.drawer__item_info}>
                <p className={styles.drawer__item_name}>{item.title}</p>
                <p className={styles.drawer__item_variant}>{item.colour} · {item.size}</p>
                <p className={styles.drawer__item_price}>${(item.price * item.quantity).toFixed(2)}</p>
                <div className={styles.drawer__item_qty}>
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, colour: item.colour, size: item.size, qty: item.quantity - 1 } })}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { productId: item.productId, colour: item.colour, size: item.size, qty: item.quantity + 1 } })}>+</button>
                  <button className={styles.drawer__remove} onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { productId: item.productId, colour: item.colour, size: item.size } })}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className={styles.drawer__footer}>
            <div className={styles.drawer__row}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={`${styles.drawer__row} ${styles['drawer__row--total']}`}>
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className={styles.drawer__checkout}>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}
