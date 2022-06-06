import { Link } from "react-router-dom";
import "./InfoView.css";

const InfoView = ({ code }) => {
  let errMsg = "";

  switch (code) {
    case 0:
      errMsg = "This page doesn't exist!";
      break;
    case 1:
      errMsg = "";
    default:
      errMsg = "Unknown error";
  }

  return (
    <div className="info-container">
      <div className="msg-box info">
        {errMsg}
        <Link to="/" className="">
          Go back to the main page
        </Link>
      </div>
    </div>
  );
};

export default InfoView;
