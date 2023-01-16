import React, { useState } from "react";
import CardFriend from "./CardFriend";

function FriendsMenu(props) {
  return ReturnFriendsMenu(props.userId);
}

function ReturnFriendsMenu(id) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="friendMenu">
      <p className="friendMenu__title">Your friends: </p>
      {returnFilters(refresh, setRefresh)}
      {ReturnFriends(id, refresh, setRefresh)}
    </div>
  );
}

function returnFilters(value, action) {
  return (
    <div className="friendMenu__filters">
      <div className="friendMenu__filters__categories">
        {returnCategories("All Categories", value, action)}
      </div>
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
          className="friendMenu__filters__categories__category friendMenu__filters__categories__category--current"
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
          className="friendMenu__filters__categories__category "
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

  event.classList.add("friendMenu__filters__categories__category--current");
}

function clearSelectedCategory() {
  const removeClass = document.getElementsByClassName(
    "friendMenu__filters__categories__category--current"
  );

  for (let remove of removeClass) {
    remove.classList.remove(
      "friendMenu__filters__categories__category--current"
    );
  }
}

function generateCategories(current) {
  let categories = ["Vegan", "Lactose Intolerance", "Loves Meat"];

  categories.unshift(current);

  return categories;
}

//#endregion

function ReturnFriends(id, refresh, setRefresh) {
  let friends = CreateFriendsList(id, refresh, setRefresh);

  if (friends)
    return (
      <div className="friendMenu__friends">
        {" "}
        {returnFriendList(friends, refresh, setRefresh)}
      </div>
    );
}

function returnFriendList(data, bool, refresh) {
  {
    return data?.filter(decideFilter).map((friend) => {
      return (
        <CardFriend
          fullDetails={friend}
          photo={friend.User.photo}
          name={friend.User.name}
          category={friend.category}
          id={friend.id}
          refresh={refresh}
          val={bool}
        />
      );
    });
  }
}

function decideFilter(element) {
  let category = document.getElementsByClassName(
    "friendMenu__filters__categories__category--current"
  )[0];

  if (category) {
    category = category.innerHTML;
    if (category == "All Categories") {
      return true;
    } else return element.category == category ? true : false;
  }
}

function CreateFriendsList(id, refresh, setRefresh) {
  const [friend, setFriend] = useState(null);
  let temp = refresh;
  const URL =
    "http://localhost:8081/api/friendshipRelation/getFriendshipRel/" + id;

  if (friend == null || temp == true)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh(false);
        temp = false;
        setFriend(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (friend != null) {
    return friend;
  }
}

export default FriendsMenu;
