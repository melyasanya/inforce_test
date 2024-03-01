interface Size {
  width: number;
  height: number;
}

interface Comment {
  id: number;
  productId: number;
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
}
