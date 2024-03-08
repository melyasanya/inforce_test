import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import css from "./MyModal.module.css";
import { AppDispatch } from "../../redux/store";
import { addProduct, editProduct } from "../../redux/operations";
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

export const MyModal: React.FC<MyModalProps> = ({
  setIsOpen,
  type,
  productId,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "count"
          ? Number.isNaN(parseInt(value, 10))
            ? ""
            : parseInt(value, 10)
          : value,
    });
  };

  const handleSizeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      size: {
        ...formData.size,
        [name]: Number.isNaN(parseInt(value, 10)) ? "" : parseInt(value, 10),
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

    const id = productId as string;

    if (type === "add") {
      dispatch(addProduct(newFormData));
    } else {
      dispatch(editProduct({ id, formData }));
    }
    setFormData(initialFormData);
    setIsOpen(false);
  };

  return (
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
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
    </div>
  );
};
