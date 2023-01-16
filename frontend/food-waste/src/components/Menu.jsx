import React from "react";
import { useEffect } from "react";
import menuImage from "./../assests/image/menu.svg";
function Menu(props) {
  useEffect(() => {
    let current = document.getElementById(
      "page__" + props.changePages.currentPage
    );
    if (current) current.classList.add("menu__container__links__link--active");
    console.log(current, props.changePages.currentPage);
  });
  return returnMenu(props.changePages, props.display);
}

function returnMenu(changePages, display) {
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__container__links">
          <p
            className="menu__container__links__link "
            id="page__main"
            onClick={(e) => {
              changePages.nextPage("main");
              display(false);
            }}
          >
            Home
          </p>
          <p
            className="menu__container__links__link"
            id="page__items"
            onClick={(e) => {
              changePages.nextPage("items");
              display(false);
            }}
          >
            Your Items
          </p>
          <p
            id="page__friends"
            className="menu__container__links__link"
            onClick={(e) => {
              changePages.nextPage("friends");
              display(false);
            }}
          >
            Your Friends
          </p>
        </div>
        <img src={menuImage} alt="" className="menu__conainter__image" />
      </div>
      <p className="menu__logout">Log Out</p>
    </div>
  );
}

export default Menu;
