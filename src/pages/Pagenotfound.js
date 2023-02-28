import React from "react";
import notfound from "../Components/assets/images/notfnd.png";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="Pagenotfound">
      <img src={notfound} className="error" />
      <Link to="/" className="goback">
        {" "}
        <button className="backhome">Go to home</button>
      </Link>
    </div>
  );
};

export default Pagenotfound;
