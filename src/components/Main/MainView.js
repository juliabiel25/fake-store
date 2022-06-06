import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainView.css";
import Navigation from "./Navigation";
import ScrollUpButton from "../ScrollUpButton";
import Loading from "../Loading/Loading";

const Item = ({ item, addItemToCart }) => {
  return (
    <div className="item">
      <Link to={`./product/${item.id}`} className="item-img">
        <img src={item.image} alt={item.title} />
      </Link>
      <div className="item-meta">
        <p className="item-title">{item.title}</p>
        <p>${item.price}</p>
        <button className="btn-dark" onClick={() => addItemToCart(item)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

function Items({ items, cart, addItemToCart }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item key={item._id} item={item} addItemToCart={addItemToCart} />
      ))}
    </div>
  );
}

function MainView({
  cart,
  addItemToCart,
  categories,
  updateCategories,
  items,
  updateItems,
  loaded,
}) {
  const [selected, setSelected] = useState(0);

  // update list of items on component mounting
  useEffect(() => {
    updateCategories();
    updateItems();
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <Navigation
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
          <Items
            items={
              selected === 0
                ? items
                : items.filter((item) => item.category === categories[selected])
            }
            cart={cart}
            addItemToCart={addItemToCart}
          />
        </>
      ) : (
        <Loading />
      )}
      <ScrollUpButton />
    </>
  );
}

export default MainView;
