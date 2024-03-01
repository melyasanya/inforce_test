import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import css from "./ProductList.module.css";
import { MyModal } from "../MyModal/MyModal";
import { deleteProduct } from "../../redux/operations";

export const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const openProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <div className={css.list}>
        {products.map((el) => {
          return (
            <div key={el.id} className={css.card}>
              <img src={el.imageUrl} alt="" className={css.productImage} />
              <p>{el.name}</p>
              <div className={css.btnGroup}>
                <button onClick={() => handleDelete(el.id)}>Delete</button>
                <button onClick={() => openProductDetails(el.id)}>
                  Show more
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={openModal}>Add product</button>
      {isOpen && <MyModal setIsOpen={setIsOpen} />}
    </>
  );
};
