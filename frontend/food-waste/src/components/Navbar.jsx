import React from "react";
import { useState } from "react";
import logo from "./../assests/image/logo.png";
import defaultUserPhoto from "./../assests/image/defaultUserPicture.png";

function Navbar(props) {
  //we use this to know if the navbar meniu was pressed or not
  const [toggleMenu, setToggleMenu] = useState(false);

  // helps the legibility of code
  const menuState = {
    toggleMenu: toggleMenu,
    setToggleMenu: setToggleMenu,
  };

  //this informations will be available from props
  //this are the notifications we have
  const notifications = {
    friendRequest: 6,
    expireSoon: 5,
    foodRequest: 3,
  };

  //this informations help us to show the user that he is connected
  const userInformations = {
    photo: "",
    name: "",
  };

  return returnNavbar(menuState, notifications, userInformations);
}

//returns the html that navbar returns
function returnNavbar(menuState, notifications, userInformations) {
  return (
    <div className="row navbar">
      <div className="navbar__leftSide">
        <img src={logo} alt="logo" className="navbar__logo" />
        <div className="navbar__searchBar">
          <div className="input">
            <input type="text" placeholder="What are you looking for?" />
            <span className="searchBar__icon icon-search"></span>
            <div className="input__options">
              <div className="button button--active">Browse Items</div>
              <div className="button">Browse People</div>
              <div className="button">Browse in your Food</div>
              <div className="button">Browse in your Friends</div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar__rightSide">
        {dispalyUserInformations(userInformations)}
        <span className="navbar__icon navbar__icon--withNotification icon-users ">
          <p className="navbar__icon__notification">
            {notifications.friendRequest}
          </p>
        </span>
        <span className="navbar__icon navbar__icon--withNotification icon-calendar">
          <p className="navbar__icon__notification">
            {notifications.expireSoon}
          </p>
        </span>
        <span className="navbar__icon  navbar__icon--withNotification icon-spoon-knife">
          <p className="navbar__icon__notification">
            {notifications.foodRequest}
          </p>
        </span>

        {openMenu(menuState.toggleMenu, menuState.setToggleMenu)}
      </div>
    </div>
  );
}

//changes if the button is pressed
function openMenu(isOpen, setOpen) {
  console.log(isOpen);
  if (!isOpen) {
    return (
      <span
        className="navbar__icon icon-menu"
        onClick={(e) => setOpen(!isOpen)}
      ></span>
    );
  } else
    return (
      <span
        className="navbar__icon icon-cross"
        onClick={(e) => setOpen(!isOpen)}
      ></span>
    );
}

//changes the informations about the user
function dispalyUserInformations(userInformations) {
  if (userInformations.photo.length < 1 && userInformations.name.length < 1) {
    return (
      <div className="row row--center">
        <img
          src={defaultUserPhoto}
          alt="Default User Photo"
          className="navbar__userPhoto"
        />
        <p className="navbar__userName">Login</p>
      </div>
    );
  } else {
    return (
      <div className="row row--center">
        <img
          src={userInformations.photo}
          alt="Default User Photo"
          className="navbar__userPhoto"
        />
        <p className="navbar__userName">{userInformations.name}</p>
      </div>
    );
  }
}

export default Navbar;
