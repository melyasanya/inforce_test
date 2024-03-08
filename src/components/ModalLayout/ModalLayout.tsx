import { useEffect } from "react";
import css from "./ModalLayout.module.css";
import { ModalLayoutProps } from "../../interface/modal";

export const ModalLayout: React.FC<ModalLayoutProps> = ({
  children,
  setIsOpen,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setIsOpen]);

  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };
  return (
    <div className={css.overlay} onClick={handleClickOverlay}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};
