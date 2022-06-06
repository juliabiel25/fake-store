import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./ProductView.css";

const ProductView = ({ addItemToCart }) => {
  const { product_id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  fetch(`https://fakestoreapi.com/products/${product_id}`)
    .then((res) => res.json())
    .then((json) => setItem(json));

  return (
    <div>
      {!item ? (
        <Loading />
      ) : (
        <div className="product">
          <div className="product-img">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="product-meta">
            <h2>{item.title}</h2>
            <h3 className="product-price">${item.price}</h3>
            <p className="product-description">{item.description}</p>
            <button className="btn-dark" onClick={() => addItemToCart(item)}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
