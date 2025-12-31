import { ProductCard } from '../components/ProductCard';
import { initialProducts } from '../mocks/initialProducts';

export const ProductList = () => {
  return (
    <>
      {initialProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
