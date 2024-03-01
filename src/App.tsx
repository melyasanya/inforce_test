import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { fetchProducts } from "./redux/operations";
import { AppDispatch } from "./redux/store";
import { ProductList } from "./components/ProductList/ProductList";
import { ProductView } from "./components/ProductView/ProductView";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:productId" element={<ProductView />} />
    </Routes>
  );
}

export default App;
