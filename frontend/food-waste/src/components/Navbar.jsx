import React from "react";
import logo from "./../assests/image/logo.png";
import defaultUserPhoto from "./../assests/image/defaultUserPicture.png";

function Navbar() {
  return returnNavbar();
}

function returnNavbar() {
  return (
    <div className="row navbar">
      <div className="navbar__leftSide">
        <img src={logo} alt="logo" className="navbar__logo" />
        <div className="navbar__searchBar">
          <input type="text" placeholder="What are you looking for?" />

          <span className="searchBar__icon icon-search"></span>
        </div>
      </div>

      <div className="navbar__rightSide">
        <img
          src={defaultUserPhoto}
          alt="Default User Photo"
          className="navbar__userPhoto"
        />
        <p className="navbar__userName">Login</p>
        <span className="navbar__icon icon-users"></span>
        <span className="navbar__icon icon-calendar"></span>
        <span className="navbar__icon icon-spoon-knife"></span>

        <span className="navbar__icon icon-menu"></span>
      </div>
    </div>
  );
}

export default Navbar;
