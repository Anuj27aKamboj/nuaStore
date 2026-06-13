import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { state, dispatch } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.navbar}>
      <div className={`${styles.navbar__inner} container`}>
        <Link to="/" className={styles.navbar__logo}>NuaStore</Link>

        <button
          className={styles.navbar__cart}
          onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
        >
          🛍 Cart
          {totalItems > 0 && (
            <span className={styles.navbar__badge}>{totalItems}</span>
          )}
        </button>
      </div>
    </header>
  );
}
