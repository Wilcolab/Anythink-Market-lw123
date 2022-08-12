import React from "react";
import logo from "../../imgs/logo.png";

const Banner = ({ changeSearchInput, showSearchInput, onGetMouser }) => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part">A place to</span>{" "}
          <span onMouseOver={onGetMouser}>get</span>
          <span> the cool stuff.</span>
        </div>
        <div className="container p-4 text-center">
          <input
            type="text"
            id="search-box"
            onChange={changeSearchInput}
            hidden={!showSearchInput}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Banner;
