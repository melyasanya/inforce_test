import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { addComment } from "../../redux/operations";
import { CommentFormProps } from "../../interface/modal";

import css from "./AddCommentModal.module.css";

export const AddCommentModal: React.FC<CommentFormProps> = ({
  productId,
  closeModal,
}) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = {
      id: nanoid(),
      productId,
      description: commentText,
      date: new Date().toLocaleString(),
    };

    dispatch(addComment({ productId, comment }));
    closeModal();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Your Comment:
        <textarea value={commentText} onChange={handleCommentChange} required />
      </label>
      <button type="submit">Add Comment</button>
      <button onClick={closeModal}>Close Modal</button>
    </form>
  );
};
