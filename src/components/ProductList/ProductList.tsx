import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import css from "./ProductList.module.css";

export const ProductList = () => {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <>
      {products.map((el) => {
        return (
          <div key={el.id} className={css.card}>
            <img src={el.imageUrl} alt="" />
            <p>{el.name}</p>
            <div>
              <button>Delete</button>
              <button>Show more</button>
            </div>
          </div>
        );
      })}
      <button>Add product</button>
    </>
  );
};
