import React, { useState } from "react";
import CardFriend from "./CardFriend";
import CardItems from "./CardItems";

function Browse(props) {
  return ReturnPageDecider(props.type, props.currentUser);
}

function ReturnPageDecider(type, id) {
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  switch (type) {
    case "item":
      if (last != "item") {
        setData(null);
        setLast("item");
      }
      SearchForItemsByName(data, setData);
      return returnBrowseItems(data, id);

    case "people":
      if (last != "people") {
        setData(null);
        setLast("people");
      }
      SearchForUsersByName(data, setData);
      return returnBrowsePeople(data, id);

    case "yitem":
      if (last != "yitem") {
        setData(null);
        setLast("yitem");
      }
      SearchForYourItemsByName(data, setData, id);
      return returnBrowseYourItems(data, setLast);

    case "ypeople":
      if (last != "ypeople") {
        setData(null);
        setLast("ypeople");
      }
      SearchForYourUsersByName(data, setData, id);
      return returnBrowseYourPeople(data, setLast);
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

//#region Browse Items

function returnBrowseItems(data, id) {
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">Your search results: </p>
      <div className="foodMenu__items"> {dataItem(data, id)}</div>
    </div>
  );
}

function dataItem(data, id) {
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

//#region Browse People
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

//#region Browse Your Items

function returnBrowseYourItems(data, setLast) {
  return (
    <div className="foodMenu">
      <p className="foodMenu__title">Your search results: </p>
      <div className="foodMenu__items"> {dataYourItem(data, setLast)}</div>
    </div>
  );
}

function dataYourItem(data, setLast) {
  return data?.map((item) => {
    return <CardItems item={item} refresh={setLast} val={true} />;
  });
}

function SearchForYourItemsByName(data, setData, id) {
  const name = searchedInput(setData);

  const URL =
    "http://localhost:8081/api/Item/getAllItemsByName/" + name + "/" + id;

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
//#region Browse People
function returnBrowseYourPeople(data, setLast) {
  return (
    <div className="friendMenu">
      <p className="friendMenu__title">Your search results: </p>
      <div className="friendMenu__friends">
        {" "}
        {dataYourFriend(data, setLast)}
      </div>
    </div>
  );
}

function dataYourFriend(data, setLast) {
  console.log(data);
  return data?.map((friend) => {
    if (friend.User)
      return (
        <CardFriend
          fullDetails={friend}
          photo={friend.User.photo}
          name={friend.User.name}
          category={friend.category}
          refresh={setLast}
        />
      );
  });
}

function SearchForYourUsersByName(data, setData, id) {
  const name = searchedInput(setData);

  const URL =
    "http://localhost:8081/api/friendshipRelation/getFriendshipRel/" +
    id +
    "/" +
    name;

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

export default Browse;
