import { ReactNode } from "react";

export interface MyModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  productId?: string;
}

export interface ConfirmationModalProps {
  setIsConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProductId: string | null;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ModalLayoutProps {
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CommentFormProps {
  productId: string;
  closeModal: () => void;
}
