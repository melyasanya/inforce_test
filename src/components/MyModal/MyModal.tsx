import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import css from "./MyModal.module.css";
import { AppDispatch } from "../../redux/store";
import { addProduct } from "../../redux/operations";
import { MyModalProps } from "../../interface/modal";

const initialFormData = {
  imageUrl: "",
  name: "",
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: "",
};

export const MyModal: React.FC<MyModalProps> = ({ setIsOpen }) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleClose]);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "count" ? parseInt(value, 10) : value,
    });
  };

  const handleSizeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      size: {
        ...formData.size,
        [name]: parseInt(value, 10),
      },
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      comments: [],
      id: nanoid(),
    };

    dispatch(addProduct(newFormData));
    setFormData(initialFormData);
    handleClose();
  };

  return (
    <div className={css.overlay} onClick={handleClickOverlay}>
      <div className={css.modal}>
        <div className={css.formBackground}>
          <form onSubmit={handleSubmit}>
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              Product Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              Count:
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              Size - Width:
              <input
                type="number"
                name="width"
                value={formData.size.width}
                onChange={handleSizeChange}
                required
              />
            </label>
            <br />

            <label>
              Size - Height:
              <input
                type="number"
                name="height"
                value={formData.size.height}
                onChange={handleSizeChange}
                required
              />
            </label>
            <br />

            <label>
              Weight:
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <button type="submit">Submit</button>
            <button onClick={handleClose}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};
