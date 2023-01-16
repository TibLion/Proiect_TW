import React, { useState } from "react";
import CardFriend from "./CardFriend";
import CardItems from "./CardItems";

function Notification(props) {
  return ReturnNotification(props.type, props.currentUser);
}

function ReturnNotification(type, id) {
  const [notif, setNotif] = useState(null);
  const [last, setLast] = useState(null);

  console.log(notif);
  switch (type) {
    case "friend":
      if (last != "friend") {
        setNotif(null);
        setLast("friend");
      }
      GetFriendsRequests(notif, setNotif, id);
      return returnFriendRequest(notif, id, setNotif);
    case "expiration":
      if (last != "expiration") {
        setNotif(null);
        setLast("expiration");
      }
      GetItemsThatExpire(notif, setNotif, id);
      return returnExpirationRequest(notif, id, setNotif);

    case "food":
      if (last != "food") {
        setNotif(null);
        setLast("food");
      }
      GetItemRequests(notif, setNotif, id);
      return returnItemRequest(notif, id, setNotif);
  }
}

//#region Friend Request

function returnFriendRequest(notif, id, setNotif) {
  return (
    <div className="friendMenu">
      <p className="friendMenu__title">Your friend requests are: </p>
      <div className="friendMenu__friends">
        {" "}
        {friendRequests(notif, id, setNotif)}
      </div>
    </div>
  );
}

function friendRequests(notif, id, setNotif) {
  return notif?.map((friend) => {
    console.log(friend.id);
    return (
      <CardFriend
        fullDetails={friend.SenderId}
        photo={friend.SenderId.photo}
        name={friend.SenderId.name}
        id={friend.SenderId.id}
        isRequest={true}
        currentUser={id}
        reqId={friend.id}
        refresh={setNotif}
        val={null}
      />
    );
  });
}

function GetFriendsRequests(notif, setNotif, id) {
  const URL =
    "http://localhost:8081/api/friendshipRequest/getAllReceivedFriendRequests/" +
    id;

  if (notif == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setNotif(result);
      })
      .catch((error) => {
        console.log(error);
      });
}

//#endregion

//#region Expiration Items
function returnExpirationRequest(notif, id, setNotif) {
  return (
    <div className="friendMenu">
      <p className="friendMenu__title">
        Things the expiration date is approaching:{" "}
      </p>
      <div className="friendMenu__friends">
        {" "}
        {expirationItems(notif, id, setNotif)}
      </div>
    </div>
  );
}

function expirationItems(notif) {
  return notif
    ?.filter((elem) => {
      const elementDate = new Date(elem.expirationDate);

      if (elementDate < nextweek()) return elem;
    })
    .sort(compareDates)
    .map((item) => {
      return <CardItems item={item} />;
    });
}
function compareDates(first, second) {
  const firstDate = new Date(first.expirationDate);
  const secondDate = new Date(second.expirationDate);

  return firstDate > secondDate ? 1 : -1;
}
function GetItemsThatExpire(notif, setNotif, id) {
  const URL = "http://localhost:8081/api/item/getAllItemsByUserId/" + id;

  if (notif == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setNotif(result);
      })
      .catch((error) => {
        console.log(error);
      });
}

function nextweek() {
  var today = new Date();
  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );
  return nextweek;
}

//#endregion

//#region Food Reqest

function returnItemRequest(notif, id, setNotif) {
  return (
    <div className="friendMenu">
      <p className="friendMenu__title">Required things: </p>
      <div className="friendMenu__friends"> {ItemRequest(notif)}</div>
    </div>
  );
}

function ItemRequest(notif) {
  return notif?.map((item) => {
    return (
      <CardItems
        item={item.Item}
        friendDetails={item.SenderId}
        relationId={item.id}
      />
    );
  });
}

function GetItemRequests(notif, setNotif, id) {
  const URL = "http://localhost:8081/api/itemRequest/getAllByReceiverId/" + id;

  if (notif == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setNotif(result);
      })
      .catch((error) => {
        console.log(error);
      });
}
//#endregion

export default Notification;
