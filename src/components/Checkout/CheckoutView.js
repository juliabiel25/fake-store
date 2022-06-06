import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CheckoutView.css";

const AddedItems = ({ cart, setCart }) => {
  const removeItemFromCart = (index) => {
    // single item of a type in cart
    if (cart[index].count === 1) {
      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
    }
    // multiple items of a type in cart
    else {
      let updatedItem = cart[index];
      updatedItem.count -= 1;
      setCart([...cart.slice(0, index), updatedItem, ...cart.slice(index + 1)]);
    }
  };

  return cart.map((item, index) => (
    <div className="checkout-item" key={item.id}>
      <div className="checkout-item-img">
        <img src={item.image} alt={`${item.title}`} />
      </div>
      <div className="checkout-item-text">
        <p>{item.title}</p>
        <p>${item.price}</p>
        <p>
          <small>Quantity: {item.count}</small>
        </p>
        <button className="btn-dark" onClick={() => removeItemFromCart(index)}>
          Remove from cart
        </button>
      </div>
    </div>
  ));
};

function CheckoutView({ cart, setCart, setNotification }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(() => {
      let sum = 0;
      cart
        .map((item) => item.price * item.count)
        .forEach((total) => (sum += total));
      return sum.toFixed(2);
    });
  }, [cart]);

  const finilizePurchase = () => {
    // send and handle a post request
    setCart([]);
    navigate("/", { replace: true });
  };

  const cancelPurchase = () => {
    setCart([]);
    navigate("/", { replace: true });
  };

  return (
    <div className="checkout">
      {cart.length > 0 && (
        <>
          <div className="cart-content">
            <h2>Items in cart</h2>
            <AddedItems cart={cart} setCart={setCart} />
          </div>
          <div className="cart-control">
            <div className="summary">
              <p>Total amount: ${total}</p>
              <p>Delivery: $8.95</p>
            </div>
            <button className="btn-dark" onClick={finilizePurchase}>
              Finilize
            </button>
            <button className="btn-dark" onClick={cancelPurchase}>
              Cancel
            </button>
          </div>
        </>
      )}
      {cart.length === 0 && (
        <div className="empty-cart-info">
          <h2>The cart is empty</h2>
          <Link to="/">Go back to the main page</Link>
        </div>
      )}
    </div>
  );
}

export default CheckoutView;
