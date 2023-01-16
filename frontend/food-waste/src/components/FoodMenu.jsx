import React, { useState } from "react";

import CardItems from "./CardItems";
import EditItems from "./EditItems";

function FoodMenu(props) {
  return ReturnFoodMenu(
    props.userId,
    props.isYou,
    props.userName,
    props.relationshipDetails,
    props.close
  );
}

function ReturnFoodMenu(id, isYou, name, relationshipDetails, close) {
  const [refresh, setRefresh] = useState(false);
  const [add, setAdd] = useState(false);
  let [item, setItem] = useState(null);

  const refreshAction = {
    value: refresh,
    action: setRefresh,
  };

  if (add === false)
    return (
      <div className="foodMenu">
        <p className="foodMenu__title">{titleDecider(isYou, name)}</p>
        {returnFilters(isYou, refresh, setRefresh, setAdd, close)}
        {ReturnItems(
          id,
          refresh,
          setRefresh,
          item,
          setItem,
          isYou,
          relationshipDetails
        )}
      </div>
    );
  else {
    return returnAddItems(setAdd, refreshAction, id);
  }
}

function returnAddItems(setAdd, refreshAction, id) {
  return (
    <EditItems setEdit={setAdd} refreshAction={refreshAction} userId={id} />
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

function returnFilters(isYou, value, action, setAdd, close) {
  return (
    <div className="foodMenu__filters">
      <div className="foodMenu__filters__categories">
        {returnCategories("All Categories", value, action)}
      </div>

      <div className="foodMenu__filters__sort">
        {addItemDecider(isYou, setAdd, close)}
      </div>
    </div>
  );
}

function addItemDecider(isYou, setAdd, close) {
  if (isYou)
    return (
      <div
        className="foodMenu__filters__sort__add "
        onClick={() => {
          setAdd(true);
        }}
      >
        <span className="icon-plus"></span>
      </div>
    );
  else
    return (
      <div
        className="foodMenu__filters__sort__add "
        onClick={() => {
          close(false);
        }}
      >
        <span className="icon-cross"></span>
      </div>
    );
}

//#region functions for the categories
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

function ReturnItems(
  id,
  refresh,
  setRefresh,
  item,
  setItem,
  isYou,
  relationshipDetails
) {
  let items = CreateItemsList(id, refresh, setRefresh, item, setItem, isYou);

  if (items)
    return (
      <div className="foodMenu__items">
        {returnItemList(items, refresh, setRefresh, isYou, relationshipDetails)}
      </div>
    );
}

function returnItemList(data, bool, refresh, isYou, relationshipDetails) {
  return data
    ?.filter(decideFilter)
    .sort(compareDates)

    .map((item) => {
      return (
        <CardItems
          item={item}
          refresh={refresh}
          val={bool}
          isYou={isYou}
          relationshipDetails={relationshipDetails}
        />
      );
    });
}

function compareDates(first, second) {
  const firstDate = new Date(first.expirationDate);
  const secondDate = new Date(second.expirationDate);

  return firstDate > secondDate ? 1 : -1;
}

function decideFilter(element) {
  let category = document.getElementsByClassName(
    "foodMenu__filters__categories__category--current"
  )[0];

  if (category) {
    category = category.innerHTML;
    if (category == "All Categories") {
      return true;
    } else return element.category == category ? true : false;
  }
}

// get through API the items based on current user
function CreateItemsList(id, refresh, setRefresh, item, setItem, isYou) {
  let temp = refresh;
  let URL;
  if (isYou === true)
    URL = "http://localhost:8081/api/item/getAllItemsByUserId/" + id;
  else
    URL = "http://localhost:8081/api/item/getAllItemsAvailableByUserId/" + id;

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
