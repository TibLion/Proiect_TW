import React from "react";

function FoodMenu(props) {
  return returnFoodMenu(props.userId, props.isYou, props.userName);
}

function returnFoodMenu(id, isYou, name) {
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">{titleDecider(isYou, name)}</p>
      {returnFilters(isYou)}
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

function returnFilters(isYou) {
  if (isYou)
    return (
      <div className="foodMenu__filters">
        {returnCategories("All Categories")}

        <div className="foodMenu__filters__menu"></div>
      </div>
    );
}

//#region functions for the  Categories
function returnCategories(current) {
  const categories = generateCategories(current);
  let isFirst = true;

  return categories?.map((element) => {
    if (isFirst) {
      isFirst = !isFirst;
      return (
        <p
          className="card__editItem__content__categories__category card__editItem__content__categories__category--current"
          onClick={(e) => {
            selectCategory(e);
          }}
        >
          {element}
        </p>
      );
    } else
      return (
        <p
          className="card__editItem__content__categories__category "
          onClick={(e) => {
            selectCategory(e);
          }}
        >
          {element}
        </p>
      );
  });
}

function selectCategory(e) {
  const event = e.target;

  const newCategory = document.getElementById("newCategory");

  newCategory.style.display = "none";

  const addNewCategory = document.getElementById("addNewCategory");

  addNewCategory.style.display = "flex";

  clearSelectedCategory();

  event.classList.add("card__editItem__content__categories__category--current");
}

function clearSelectedCategory() {
  const removeClass = document.getElementsByClassName(
    "card__editItem__content__categories__category--current"
  );

  const addNewCategory = document.getElementById("addNewCategory");
  addNewCategory.classList.remove(
    "card__editItem__content__categories__category--current"
  );

  for (let remove of removeClass) {
    remove.classList.remove(
      "card__editItem__content__categories__category--current"
    );
  }
}

function generateCategories(current) {
  let categories = ["Vegetables", "Fruits", "Meat", "Dairy", "Seeds"];

  categories.unshift(current);

  return remove_duplicates(categories);
}

function remove_duplicates(arr) {
  let obj = {};
  let ret_arr = [];
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (let key in obj) {
      ret_arr.push(key);
    }

    return ret_arr;
  }
}

//#endregion

export default FoodMenu;
