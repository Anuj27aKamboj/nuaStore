import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.scss';

const CATEGORIES = ['All', "men's clothing", "women's clothing", 'electronics', 'jewelery'];

export default function Home() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <main className={styles.home}>
      <div className="container">
        <h1 className={styles.home__title}>All Products</h1>

        <div className={styles.home__filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.home__filter} ${activeCategory === cat ? styles['home__filter--active'] : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading && <p className={styles.home__status}>Loading products...</p>}
        {error && <p className={styles.home__error}>{error}</p>}

        {!loading && !error && (
          <div className={styles.home__grid}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
