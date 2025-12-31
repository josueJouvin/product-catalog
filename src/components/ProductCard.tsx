interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    favorite: boolean;
    image: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} />
    </>
  );
};
