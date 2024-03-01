import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../redux/store";
import { Product } from "../../interface/products";

export const ProductView = () => {
  const { productId } = useParams();

  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === productId)
  ) as Product;

  return (
    product && (
      <>
        <img src={product.imageUrl} alt="" />
        <p>{product.name}</p>
        <p>{product.count}</p>
        <p>{product.size.height}</p>
        <p>{product.size.width}</p>
        <p>{product.weight}</p>
        {product.comments.map((el) => {
          return (
            <div key={el.id}>
              <p>{el.description}</p>
              <p>{el.date}</p>
            </div>
          );
        })}
      </>
    )
  );
};
