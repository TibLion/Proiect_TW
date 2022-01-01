import React, { useState } from "react";

import CardItems from "./CardItems";

function FoodMenu(props) {
  return ReturnFoodMenu(props.userId, props.isYou, props.userName);
}

function ReturnFoodMenu(id, isYou, name) {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">{titleDecider(isYou, name)}</p>
      {returnFilters(isYou, refresh, setRefresh)}
      {ReturnItems(id, refresh, setRefresh)}
    </div>
  );
}

//Depending on the user, the title changes
function titleDecider(isYou, name) {
  if (isYou) {
    return "Your items: ";
  } else {
    return name + "'s items: ";
  }
}

function returnFilters(isYou, value, action) {
  if (isYou)
    return (
      <div className="foodMenu__filters">
        <div className="foodMenu__filters__categories">
          {returnCategories("All Categories", value, action)}
        </div>

        <div className="foodMenu__filters__sort">
          <div className="foodMenu__filters__add">
            <span className="icon-plus"></span>
          </div>
        </div>
      </div>
    );
}

//#region functions for the  Categories
function returnCategories(current, value, action) {
  const categories = generateCategories(current);
  let isFirst = true;

  return categories?.map((element) => {
    if (isFirst) {
      isFirst = !isFirst;
      return (
        <p
          className="foodMenu__filters__categories__category foodMenu__filters__categories__category--current"
          onClick={(e) => {
            selectCategory(e);
            action(!value);
          }}
        >
          {element}
        </p>
      );
    } else
      return (
        <p
          className="foodMenu__filters__categories__category "
          onClick={(e) => {
            selectCategory(e);
            action(!value);
          }}
        >
          {element}
        </p>
      );
  });
}

function selectCategory(e) {
  const event = e.target;

  clearSelectedCategory();

  event.classList.add("foodMenu__filters__categories__category--current");
}

function clearSelectedCategory() {
  const removeClass = document.getElementsByClassName(
    "foodMenu__filters__categories__category--current"
  );

  for (let remove of removeClass) {
    remove.classList.remove("foodMenu__filters__categories__category--current");
  }
}

function generateCategories(current) {
  let categories = ["Vegetables", "Fruits", "Meat", "Dairy", "Seeds"];

  categories.unshift(current);

  return categories;
}

//#endregion

//#region getItems

function ReturnItems(id, refresh, setRefresh) {
  let items = CreateItemsList(id, refresh, setRefresh);

  if (items)
    return (
      <div className="foodMenu__items">
        {returnItemList(items, refresh, setRefresh)}
      </div>
    );
}

function returnItemList(data, bool, refresh) {
  return data
    ?.filter(decideFilter)
    .sort(compareDates)

    .map((item) => {
      return <CardItems item={item} refresh={refresh} val={bool} />;
    });
}

function compareDates(first, second) {
  const firstDate = new Date(first.expirationDate);
  const secondDate = new Date(second.expirationDate);

  return firstDate > secondDate ? 1 : -1;
}

function decideFilter(element) {
  const category = document.getElementsByClassName(
    "foodMenu__filters__categories__category--current"
  )[0].innerHTML;

  if (category == "All Categories") {
    return true;
  } else return element.category == category ? true : false;
}

// we get through API the items based on current user
function CreateItemsList(id, refresh, setRefresh) {
  let temp = refresh;
  let [item, setItem] = useState(null);

  const URL = "http://localhost:8081/api/item/getAllItemsByUserId/" + id;
  if (item == null || temp == true)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh(false);
        temp = false;
        setItem(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (item != null) {
    return item;
  }
}
//#endregion

export default FoodMenu;
