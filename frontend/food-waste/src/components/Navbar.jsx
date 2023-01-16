import React from "react";
import { useState } from "react";
import logo from "./../assests/image/logo.png";
import defaultUserPhoto from "./../assests/image/defaultUserPicture.png";
import Menu from "./Menu";

function Navbar(props) {
  //this is used to know if the navbar meniu was pressed or not
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuState = {
    toggleMenu: toggleMenu,
    setToggleMenu: setToggleMenu,
  };

  let notifications;
  let id = 0;
  if (props.info) {
    notifications = getTheNumberOfNptifications(props.info.id);
    id = props.info.id;
  }

  //this helps us to show that the user is connected
  let userInformations = {
    photo: "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
    name: "Login",
    itIsLoggedIn: false,
  };

  //this shows us the informations about the page
  const pageSelector = {
    currentPage: props.currentPage,
    nextPage: props.setPage,
  };

  //if get infos from props, show them
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

  return returnNavbar(
    menuState,
    notifications,
    userInformations,
    pageSelector,
    id
  );
}
//returns the html that navbar returns
function returnNavbar(
  menuState,
  notifications,
  userInformations,
  pageSelector,
  id
) {
  if (userInformations.itIsLoggedIn)
    return (
      <div className="nav">
        <div className="row navbar">
          <div className="navbar__leftSide">
            <img src={logo} alt="logo" className="navbar__logo" />
            <div className="navbar__searchBar">
              <div className="input">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  id="searchInput"
                />
                <span className="searchBar__icon icon-search"></span>
                <div className="input__options">
                  <div
                    className="button button--active input__option "
                    onClick={(e) => {
                      selectThisItem(e);
                      pageSelector.nextPage("browseItem");
                    }}
                  >
                    Browse Items
                  </div>
                  <div
                    className="button input__option"
                    onClick={(e) => {
                      selectThisItem(e);
                      pageSelector.nextPage("browsePeople");
                    }}
                  >
                    Browse People
                  </div>
                  <div
                    className="button input__option"
                    onClick={(e) => {
                      selectThisItem(e);
                      SearchForItemsByNameAndId(e, id);
                      pageSelector.nextPage("browseInYourFood");
                    }}
                  >
                    Browse in your Food
                  </div>
                  <div
                    className="button input__option"
                    onClick={(e) => {
                      SearchForFriendByNameAndId(e, id);
                      pageSelector.nextPage("browseInYourFriends");
                    }}
                  >
                    Browse in your Friends
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar__rightSide">
            {dispalyUserInformations(userInformations)}
            {returnNotifications(notifications, pageSelector.nextPage)}
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

//#region functions for search bar
function SearchForUsersByName(e) {
  selectThisItem(e);

  const name = document.getElementById("searchInput").value;

  const URL = "http://localhost:8081/api/User/findByName/" + name;

  if (name.length > 1)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
}

function SearchForItemsByName(e) {
  selectThisItem(e);

  const name = document.getElementById("searchInput").value;

  const URL = "http://localhost:8081/api/Item/getAllItemsByName/" + name;

  if (name.length > 1)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
}

function SearchForItemsByNameAndId(e, id) {
  selectThisItem(e);

  const name = document.getElementById("searchInput").value;

  const URL =
    "http://localhost:8081/api/Item/getAllItemsByName/" + name + "/" + id;

  if (name.length > 1)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
}

function SearchForFriendByNameAndId(e, id) {
  selectThisItem(e);

  const name = document.getElementById("searchInput").value;
  console.log(name);
  const URL =
    "http://localhost:8081/api/friendshipRelation/getFriendshipRel/" +
    id +
    "/" +
    name;

  if (name.length > 1)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
}
//#endregion

function selectThisItem(e) {
  clearSelectedSearchItem();
  e.target.classList.add("button--active");
}

function clearSelectedSearchItem() {
  const removeClass = document.getElementsByClassName("button--active");

  for (let remove of removeClass) {
    remove.classList.remove("button--active");
  }
}

//#region  Notifications

//return the Html notification content
function returnNotifications(notifications, nextPage) {
  return (
    <div className="row">
      {returnNotification("icon-users", notifications.friendRequest, nextPage)}
      {returnNotification("icon-calendar", notifications.expireSoon, nextPage)}
      {returnNotification(
        "icon-spoon-knife",
        notifications.foodRequest,
        nextPage
      )}
    </div>
  );
}

//returns every notification(if there are notif, show the number, if not, don't show anything)
function returnNotification(icon, data, nextPage) {
  const className = "navbar__icon navbar__icon--withNotification " + icon;

  if (data > 0)
    return (
      <span className={className} onClick={() => nextPage(icon)}>
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

//get the number of friend requests
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

//get the number of Requested Food - Received
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

//#endregion

//#region  Menu

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

//returns the menu
function displayTheMenu(isOpen, setOpen, pageSelector) {
  if (isOpen) return <Menu changePages={pageSelector} display={setOpen} />;
}

//#endregion

export default Navbar;
