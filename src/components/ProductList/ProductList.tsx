import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../redux/store";
import css from "./ProductList.module.css";
import { MyModal } from "../MyModal/MyModal";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { ModalLayout } from "../ModalLayout/ModalLayout";

export const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [sortingOption, setSortingOption] = useState<string>("name");
  const { products } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  const openProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleDelete = (id: string) => {
    setSelectedProductId(id);
    setIsConfirmationOpen(true);
  };

  const handleSortingChange = (option: string) => {
    setSortingOption(option);
  };

  // Винести функцію сортування окремо

  const sortedProducts = [...products].sort((a, b) => {
    // У випадку більшої кількості варіантів краще використати switch
    if (sortingOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortingOption === "count") {
      return a.count - b.count;
    }
    return 0;
  });

  return (
    <>
      <div className={css.list}>
        <div>
          <label>Sort by:</label>
          <select
            value={sortingOption}
            onChange={(e) => handleSortingChange(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="count">Count</option>
          </select>
        </div>
        {/* Винести в окремий компонент */}
        {sortedProducts.map((el) => {
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
      <button onClick={() => setIsOpen(true)}>Add product</button>
      {(isOpen || isConfirmationOpen) && (
        <ModalLayout setIsOpen={isOpen ? setIsOpen : setIsConfirmationOpen}>
          {isOpen ? (
            <MyModal setIsOpen={setIsOpen} type="add" />
          ) : (
            <ConfirmationModal
              setIsConfirmationOpen={setIsConfirmationOpen}
              selectedProductId={selectedProductId}
              setSelectedProductId={setSelectedProductId}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
};
