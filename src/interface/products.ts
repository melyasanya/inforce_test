interface Size {
  width: number;
  height: number;
}

interface Comment {
  id: string;
  productId: string;
  description: string;
  date: string;
}

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
}

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string;
  sortingOption: string;
}

export interface DeleteCommentPayload {
  productId: string;
  commentId: string;
}

export interface AddCommentPayload {
  productId: string;
  comment: Comment;
}

interface ProductToEdit {
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
}

export interface EditProduct {
  id: string;
  formData: ProductToEdit;
}
