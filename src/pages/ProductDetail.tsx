//Imports
//....
//....
//....

import { useParams } from 'react-router-dom';

export const ProductDetail = () => {
  const params = useParams<{ id: string }>();
  return (
    <>
      <h2>Product detail</h2>
      {params.id}
    </>
  );
};
