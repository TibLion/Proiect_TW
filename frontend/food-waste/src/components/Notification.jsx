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
      return <div className=""> expiration</div>;

    case "food":
      return <div className=""> food</div>;
  }
}

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

export default Notification;
