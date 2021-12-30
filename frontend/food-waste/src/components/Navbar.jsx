import React from "react";
import { useState } from "react";
import logo from "./../assests/image/logo.png";
import defaultUserPhoto from "./../assests/image/defaultUserPicture.png";
import Menu from "./Menu";

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
  let notifications;
  if (props.info) notifications = getTheNumberOfNptifications(props.info.id);

  //this informations help us to show the user that he is connected
  let userInformations = {
    photo: "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
    name: "Login",
    itIsLoggedIn: false,
  };

  //This show us the informations about our page
  const pageSelector = {
    currentPage: props.currentPage,
    nextPage: props.setPage,
  };

  //if I get infos from props, I show them
  if (props.info != undefined || props.info != null) {
    if (props.info.photo != null) {
      userInformations.photo = props.info.photo;
      userInformations.itIsLoggedIn = true;
    }
    if (props.info.name != null) {
      userInformations.name = props.info.name;
      userInformations.itIsLoggedIn = true;
    }
  }

  return returnNavbar(menuState, notifications, userInformations, pageSelector);
}

//TODO: When I am in login don't show all the items in the navbar: searchbar, notification Icons + menu

//returns the html that navbar returns
function returnNavbar(
  menuState,
  notifications,
  userInformations,
  pageSelector
) {
  if (userInformations.itIsLoggedIn)
    return (
      <div className="nav">
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
            {returnNotifications(notifications)}
            {openMenu(menuState.toggleMenu, menuState.setToggleMenu)}
          </div>
        </div>
        {displayTheMenu(
          menuState.toggleMenu,
          menuState.setToggleMenu,
          pageSelector
        )}
      </div>
    );
  else
    return (
      <div className="nav">
        <div className="row navbar">
          <div className="navbar__leftSide">
            <img src={logo} alt="logo" className="navbar__logo" />
          </div>

          <div className="navbar__rightSide">
            {dispalyUserInformations(userInformations)}
          </div>
        </div>
      </div>
    );
}

//return the Html notification content
function returnNotifications(notifications) {
  return (
    <div className="row">
      {returnNotification("icon-users", notifications.friendRequest)}
      {returnNotification("icon-calendar", notifications.expireSoon)}
      {returnNotification("icon-spoon-knife", notifications.foodRequest)}
    </div>
  );
}

//return every notiviation(if there are notif, show the number, if not, don't show anything)
function returnNotification(icon, data) {
  const className = "navbar__icon navbar__icon--withNotification " + icon;

  if (data > 0)
    return (
      <span className={className}>
        <p className={"navbar__icon__notification"}>{data}</p>
      </span>
    );
  else
    return (
      <span className={className}>
        <p></p>
      </span>
    );
}

//changes if the button is pressed
function openMenu(isOpen, setOpen) {
  if (!isOpen) {
    return (
      <span
        className="navbar__icon icon-menu"
        onClick={(e) => setOpen(!isOpen)}
      ></span>
    );
  } else {
    return (
      <div>
        <span
          className="navbar__icon icon-cross"
          onClick={(e) => setOpen(!isOpen)}
        ></span>
      </div>
    );
  }
}

//return the menu
function displayTheMenu(isOpen, setOpen, pageSelector) {
  if (isOpen) return <Menu changePages={pageSelector} display={setOpen} />;
}

//changes the informations about the user
function dispalyUserInformations(userInformations) {
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

function getTheNumberOfNptifications(userId) {
  const notifications = {
    friendRequest: GetNumberOfFriendRequest(userId),
    expireSoon: GetNumberOfItemsThatExpireSoon(userId),
    foodRequest: GetNumberOfRequestedFood(userId),
  };

  return notifications;
}

//get the number of friend Requests
function GetNumberOfFriendRequest(userId) {
  const [count, setCount] = useState(null);
  let temp = null;
  const URL =
    "http://localhost:8081/api/friendshipRequest/getAllReceivedFriendRequests/" +
    userId;

  if (!count)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        temp = result.length;
        setCount(temp);
      })
      .catch((error) => {
        console.log(error);
      });

  if (count) return count;
}

//get The number of Requested Food -Received
function GetNumberOfRequestedFood(userId) {
  const [count, setCount] = useState(null);
  let temp = null;
  const URL =
    "http://localhost:8081/api/itemRequest/getAllByReceiverId/" + userId;

  if (!count)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        temp = result.length;
        setCount(temp);
      })
      .catch((error) => {
        console.log(error);
      });

  if (count) return count;
}

//get the number of items that expire soon
function GetNumberOfItemsThatExpireSoon(userId) {
  let temp = null;
  let [item, setItem] = useState(null);

  const URL = "http://localhost:8081/api/item/getAllItemsByUserId/" + userId;
  if (item == null || temp == true)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        temp = false;
        setItem(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (item != null) {
    return item.filter((elem) => {
      const elementDate = new Date(elem.expirationDate);

      if (elementDate < nextweek()) return elem;
    }).length;
  }
}

function nextweek() {
  var today = new Date();
  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  return nextweek;
}

export default Navbar;
