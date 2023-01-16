import React from "react";

function EditItems(props) {
  return returnEditItem(
    props.infos,
    props.setEdit,
    props.refreshAction,
    props.userId
  );
}

//return the Html content
function returnEditItem(info, close, refresh, id) {
  console.log(id);
  //if info exist, then edit an item
  if (info)
    return (
      <div className="card__edit">
        <div className="card__editItem">
          <div className="card__editItem__photo">
            <img src={info.photo} className="card__editItem__photo__image" />
            <input
              type="text"
              className="card__editItem__photo__link"
              defaultValue={info.photo}
              id="EditItemPhoto"
              placeholder="Link to the Item Image"
            />
          </div>
          <div className="card__editItem__content">
            <div className="card__editItem__content__nameAndDate">
              <input
                type="text"
                className="card__editItem__content__nameAndDate__name"
                defaultValue={info.name}
                placeholder="Name of the item"
                id="EditItemName"
              />
              <input
                type="date"
                className="card__editItem__content__nameAndDate__date"
                defaultValue={generateData(info.expirationDate)}
                placeholder="Date of Expiration"
                id="EditItemDate"
              />
            </div>
            <div className="card__editItem__content__categories">
              {returnCategories(info.category)}
              <input
                type="text"
                name="newCategory"
                id="newCategory"
                placeholder="Click to write custom category"
                className="card__editItem__content__categories__category displayNone"
              />
              <p
                className="card__editItem__content__categories__category "
                id="addNewCategory"
                onClick={(e) => {
                  selectCategory(e);
                  displayNewCategory(e);
                }}
              >
                Add new category +
              </p>
            </div>
            <textarea
              cols="30"
              rows="10"
              maxLength="255"
              className="card__editItem__content__description"
              defaultValue={info.description}
              placeholder="Descripiton of the item"
              id="EditItemDescription"
            ></textarea>
            <input
              type="text"
              className="card__editItem__content__quatity"
              defaultValue={info.quantity}
              placeholder="Quantity of the product"
              id="EditItemQuantity"
            />
            <div className="card__actions">
              <div
                className="card__actions__pencil "
                onClick={(e) => {
                  sendTheData(info, close, refresh);
                }}
              >
                <p className="card__actions__pencil__name">Save Changes</p>
                <span className="icon-pencil"></span>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  // else create an item
  else {
    return (
      <div className="card__edit">
        <div className="card__editItem">
          <div className="card__editItem__photo">
            <img
              src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              className="card__editItem__photo__image"
            />
            <input
              type="text"
              className="card__editItem__photo__link"
              id="SaveItemPhoto"
              placeholder="Link to the Item Image"
            />
          </div>
          <div className="card__editItem__content">
            <div className="card__editItem__content__nameAndDate">
              <input
                type="text"
                className="card__editItem__content__nameAndDate__name"
                placeholder="Name of the item"
                id="SaveItemName"
              />
              <input
                type="date"
                className="card__editItem__content__nameAndDate__date"
                placeholder="Date of Expiration"
                id="SaveItemDate"
              />
            </div>
            <div className="card__editItem__content__categories">
              {returnCategories("Unset")}
              <input
                type="text"
                name="newCategory"
                id="newCategory"
                placeholder="Click to write custom category"
                className="card__editItem__content__categories__category displayNone"
              />
              <p
                className="card__editItem__content__categories__category "
                id="addNewCategory"
                onClick={(e) => {
                  selectCategory(e);
                  displayNewCategory(e);
                }}
              >
                Add new category +
              </p>
            </div>
            <textarea
              cols="30"
              rows="10"
              maxLength="255"
              className="card__editItem__content__description"
              placeholder="Descripiton of the item"
              id="SaveItemDescription"
            ></textarea>
            <input
              type="text"
              className="card__editItem__content__quatity"
              placeholder="Quantity of the product"
              id="SaveItemQuantity"
            />
            <div className="card__actions">
              <div
                className="card__actions__pencil "
                onClick={(e) => {
                  postTheData(id, close, refresh);
                }}
              >
                <p className="card__actions__pencil__name">Save Changes</p>
                <span className="icon-pencil"></span>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

//#region functions for the categories
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

function displayNewCategory(e) {
  const event = e.target;
  event.style.display = "none";

  const newCategory = document.getElementById("newCategory");

  newCategory.style.display = "flex";

  newCategory.classList.add(
    "card__editItem__content__categories__category--current"
  );
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

//we generate the date from ISO Dates (Data-Time) format from the DataBase to a more readable format
function generateData(data) {
  //get the date from the db in ISO Dates (Date-Time) format
  let createDate = new Date(data);
  console.log(createDate.toISOString().substr(0, 10));
  return createDate.toISOString().substr(0, 10);
}

//send the data
async function sendTheData(data, setEdit, refresh) {
  const category = document.getElementsByClassName(
    "card__editItem__content__categories__category--current"
  );

  const categoryElement =
    category[0].innerHTML.length < 1
      ? category[0].value
      : category[0].innerHTML;

  const URL = "http://localhost:8081/api/item/putItem";

  const body = {
    id: data.id,
    user_id: data.user_id,
    name: document.getElementById("EditItemName").value,
    description: document.getElementById("EditItemDescription").value,
    quantity: document.getElementById("EditItemQuantity").value,
    category: categoryElement,
    expirationDate: document.getElementById("EditItemDate").value,
    isAvailable: data.isAvailable,
    photo: document.getElementById("EditItemPhoto").value,
  };
  console.log(body);

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

async function postTheData(id, setEdit, refresh) {
  const category = document.getElementsByClassName(
    "card__editItem__content__categories__category--current"
  );

  const categoryElement =
    category[0].innerHTML.length < 1
      ? category[0].value
      : category[0].innerHTML;

  const URL = "http://localhost:8081/api/item/postItem";

  const body = {
    user_id: id,
    name: document.getElementById("SaveItemName").value,
    description: document.getElementById("SaveItemDescription").value,
    quantity: document.getElementById("SaveItemQuantity").value,
    category: categoryElement,
    expirationDate: document.getElementById("SaveItemDate").value,
    isAvailable: 0,
    photo: document.getElementById("SaveItemPhoto").value,
  };
  console.log(body);

  await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
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

export default EditItems;
