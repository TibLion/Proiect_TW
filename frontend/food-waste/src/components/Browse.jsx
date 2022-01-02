import React, { useState } from "react";
import CardItems from "./CardItems";

function Browse(props) {
  return ReturnPageDecider(props.type, props.currentUser);
}

function ReturnPageDecider(type, id) {
  const [data, setData] = useState(null);

  switch (type) {
    case "item":
      SearchForItemsByName(data, setData);

      return returnBrowseItems(data, id);

    case "people":
      return returnBrowsePeople();

    case "yitem":
      return returnBrowseYourItems();

    case "ypeople":
      return returnBrowseYourPeople();
  }
}

function searchedInput(setData) {
  const htmlInput = document.getElementById("searchInput");

  htmlInput.addEventListener("change", () => {
    setData(null);
  });

  const searchedElement = htmlInput.value;
  if (searchedElement.length > 1) return searchedElement;
}

function returnBrowseItems(data, id) {
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">Your searched for: </p>
      <div className="foodMenu__items"> {dataItem(data, id)}</div>
    </div>
  );
}

function dataItem(data, id) {
  console.log(data, id);
  return data?.map((item) => {
    if (item.user_id != id) return <CardItems item={item} isYou={false} />;
  });
}

function SearchForItemsByName(data, setData) {
  const name = searchedInput(setData);

  const URL = "http://localhost:8081/api/Item/getAllItemsByName/" + name;

  if (data == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
}

function returnBrowsePeople() {
  return <div>People</div>;
}
function returnBrowseYourItems() {
  return <div>Your Items</div>;
}
function returnBrowseYourPeople() {
  return <div>People</div>;
}
export default Browse;
