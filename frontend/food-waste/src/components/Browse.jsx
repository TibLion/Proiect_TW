import React, { useState } from "react";
import CardFriend from "./CardFriend";
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
      SearchForUsersByName(data, setData);
      return returnBrowsePeople(data, id);

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

//#region  Browse Items

function returnBrowseItems(data, id) {
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">Your search results: </p>
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

//#endregion

function returnBrowsePeople(data, id) {
  return (
    <div className="friendMenu">
      <p className="friendMenu__title">Your search results: </p>
      <div className="friendMenu__friends"> {dataFriend(data, id)}</div>
    </div>
  );
}

function dataFriend(data, id) {
  return data?.map((friend) => {
    console.log(id);
    return (
      <CardFriend
        fullDetails={friend}
        photo={friend.photo}
        name={friend.name}
        id={friend.id}
        isFriend={false}
        currentUser={id}
      />
    );
  });
}

function SearchForUsersByName(data, setData) {
  const name = searchedInput(setData);

  const URL = "http://localhost:8081/api/User/findByName/" + name;

  if (data == null)
    if (name.length > 1)
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

function returnBrowseYourItems() {
  return <div>Your Items</div>;
}
function returnBrowseYourPeople() {
  return <div>People</div>;
}
export default Browse;
