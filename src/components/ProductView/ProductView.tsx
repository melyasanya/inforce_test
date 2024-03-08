import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import { Product } from "../../interface/products";
import { deleteComment } from "../../redux/operations";
import { useState } from "react";
import { ModalLayout } from "../ModalLayout/ModalLayout";
import { AddCommentModal } from "../AddCommentModal/AddCommentModal";
import { MyModal } from "../MyModal/MyModal";

export const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === productId)
  ) as Product;

  const handleDelete = (productId: string, commentId: string) => {
    dispatch(deleteComment({ productId, commentId }));
  };

  const toggleCommentModal = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const toggleEditModal = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    product && (
      <>
        <img src={product.imageUrl} alt="" />
        <p>{product.name}</p>
        <p>{product.count}</p>
        <p>{product.size.height}</p>
        <p>{product.size.width}</p>
        <p>{product.weight}</p>
        {/* Виділити коментарі в окремий компонент */}
        {product.comments?.map((el) => {
          return (
            <div key={el.id}>
              <p>{el.description}</p>
              <p>{el.date}</p>
              <button onClick={() => handleDelete(product.id, el.id)}>
                Delete comment
              </button>
            </div>
          );
        })}
        <div>
          <button onClick={toggleCommentModal}>Add Comment</button>
          <button onClick={toggleEditModal}>Edit Product</button>
        </div>
        {(isCommentOpen || isEditOpen) && (
          <ModalLayout
            setIsOpen={isCommentOpen ? setIsCommentOpen : setIsEditOpen}
          >
            {isCommentOpen ? (
              <AddCommentModal
                productId={product.id}
                closeModal={toggleCommentModal}
              />
            ) : (
              <MyModal
                setIsOpen={setIsEditOpen}
                type="edit"
                productId={product.id}
              />
            )}
          </ModalLayout>
        )}
      </>
    )
  );
};
