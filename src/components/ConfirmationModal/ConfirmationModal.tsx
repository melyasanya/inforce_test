import { useDispatch } from "react-redux";

import { ConfirmationModalProps } from "../../interface/modal";
import { AppDispatch } from "../../redux/store";
import { deleteProduct } from "../../redux/operations";

import css from "./ConfirmationModal.module.css";

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  setIsConfirmationOpen,
  selectedProductId,
  setSelectedProductId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const confirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId));
      setIsConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setSelectedProductId(null);
    setIsConfirmationOpen(false);
  };

  return (
    <div className={css.modalBackground}>
      <p>Are you sure you want to delete this product?</p>
      <div className={css.btnGroup}>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </div>
  );
};
