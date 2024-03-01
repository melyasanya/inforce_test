import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { fetchProducts } from "./redux/operations";
import { AppDispatch } from "./redux/store";
import { ProductList } from "./components/ProductList/ProductList";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <ProductList />;
}

export default App;
