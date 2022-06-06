import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./components/Checkout/CheckoutView";
import CheckoutView from "./components/Checkout/CheckoutView";
import MainView from "./components/Main/MainView";
import ProductView from "./components/Product/ProductView";
import Header from "./components/Header";
import InfoView from "./components/Info/InfoView";

function App() {
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState();
  const [items, setItems] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    items && categories ? setLoaded(true) : setLoaded(false);
  }, [categories, items]);

  const updateCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(["All products", ...json]));
  };

  const updateItems = () =>
    fetch("https://fakestoreapi.com/products?limit=15")
      .then((res) => res.json())
      .then((json) => setItems(json));

  const addItemToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);

    // item not yet added to cart
    if (index === -1) {
      item.count = 1;
      setCart([...cart, item]);
    }
    // item already in cart
    else {
      let updatedItem = cart[index];
      updatedItem.count += 1;

      setCart([
        ...cart.slice(0, index),
        updatedItem,
        ...cart.slice(index + 1, cart.length),
      ]);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header itemCount={cart} />
        <main>
          <div className="main-container">
            <Routes>
              <Route
                path="/"
                element={
                  <MainView
                    cart={cart}
                    addItemToCart={addItemToCart}
                    categories={categories}
                    updateCategories={updateCategories}
                    items={items}
                    updateItems={updateItems}
                    loaded={loaded}
                  />
                }
              ></Route>
              <Route
                path="/checkout"
                element={<CheckoutView cart={cart} setCart={setCart} />}
              ></Route>
              <Route
                path="/product/:product_id"
                element={<ProductView addItemToCart={addItemToCart} />}
              ></Route>
              <Route path="*" element={<InfoView code={0} />}></Route>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
