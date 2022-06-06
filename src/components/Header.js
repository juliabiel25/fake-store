import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <h1>Fake Store</h1>
        </Link>
        <div className="side-nav">
          <div className="checkout-btn-container">
            <Link to="/checkout" className="checkout-btn btn-dark">
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
