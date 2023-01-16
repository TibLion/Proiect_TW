import React from "react";

function EditFriend(props) {
  return returnEditFriend(props.data, props.setEdit, props.refresh);
}

//returns the content
function returnEditFriend(friendRelationship, setEdit, refresh) {
  return (
    <div className="card__edit">
      <div className="card__editFriend">
        <img
          src={friendRelationship.User.photo}
          className="card__editFriend__photo"
        />
        <div className="card__editFriend__details">
          <p className="card__editFriend__details__name">
            {friendRelationship.User.name}
          </p>
          <p className="card__editFriend__details__email">
            {friendRelationship.User.email}
          </p>
          <div className="card__editFriend__details__categories">
            {returnCategories(friendRelationship.category)}
            <input
              type="text"
              name="newCategory"
              id="newCategory"
              className="card__editFriend__details__categories__category displayNone"
            />
            <p
              className="card__editFriend__details__categories__category "
              id="addNewCategory"
              onClick={(e) => {
                selectCategory(e);
                displayNewCategory(e);
              }}
            >
              Add new category +
            </p>
          </div>
          <div className="card__actions">
            <div
              className="card__actions__pencil "
              onClick={(e) => {
                sendTheData(friendRelationship.id, setEdit, refresh);
              }}
            >
              <p className="card__actions__pencil__name">Save Changes</p>
              <span className="icon-pencil"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//#region  categories region
//return the categories
function returnCategories(current) {
  const categories = generateCategories(current);
  let isFirst = true;

  return categories?.map((element) => {
    if (isFirst) {
      isFirst = !isFirst;
      return (
        <p
          className="card__editFriend__details__categories__category card__editFriend__details__categories__category--current"
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
          className="card__editFriend__details__categories__category "
          onClick={(e) => {
            selectCategory(e);
          }}
        >
          {element}
        </p>
      );
  });
}
//see the current category
function selectCategory(e) {
  const event = e.target;

  const newCategory = document.getElementById("newCategory");

  newCategory.style.display = "none";

  const addNewCategory = document.getElementById("addNewCategory");

  addNewCategory.style.display = "flex";

  clearSelectedCategory();

  event.classList.add(
    "card__editFriend__details__categories__category--current"
  );
}

//if pressed on new category
function displayNewCategory(e) {
  const event = e.target;
  event.style.display = "none";

  const newCategory = document.getElementById("newCategory");

  newCategory.style.display = "flex";

  newCategory.classList.add(
    "card__editFriend__details__categories__category--current"
  );
}

//clear all the selected categories
function clearSelectedCategory() {
  const removeClass = document.getElementsByClassName(
    "card__editFriend__details__categories__category--current"
  );

  const addNewCategory = document.getElementById("addNewCategory");
  addNewCategory.classList.remove(
    "card__editFriend__details__categories__category--current"
  );

  for (let remove of removeClass) {
    remove.classList.remove(
      "card__editFriend__details__categories__category--current"
    );
  }
}

//generate the categories
function generateCategories(current) {
  let categories = ["Vegan", "Loves Meat", "Lactose Intolerance"];

  categories.unshift(current);

  return remove_duplicates(categories);
}

//remove duplicates (if it has the same category twice, shows only once)
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

//send the modifications
async function sendTheData(id, setEdit, refresh) {
  const category = document.getElementsByClassName(
    "card__editFriend__details__categories__category--current"
  );

  const categoryElement =
    category[0].innerHTML.length < 1
      ? category[0].value
      : category[0].innerHTML;

  let body = {
    id: id,
    category: categoryElement,
  };
  console.log(body);
  const URL = "http://localhost:8081/api/friendshipRelation/putFriendShip";

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setEdit(false);
      refresh.action(!refresh.value);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default EditFriend;
