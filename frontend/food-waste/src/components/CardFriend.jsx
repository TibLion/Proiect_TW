import React, { useState } from "react";
import EditFriend from "./EditFriend";
import FoodMenu from "./FoodMenu";

function CardFriend(props) {
  return ReturnCardFriend(
    props.photo,
    props.name,
    props.category,
    props.id,
    props.refresh,
    props.val,
    props.fullDetails,
    props.isFriend,
    props.currentUser,
    props.isRequest,
    props.reqId
  );
}

function ReturnCardFriend(
  photo,
  name,
  category,
  id,
  refresh,
  val,
  fullDetails,
  isFriend,
  currentUser,
  isRequest,
  reqId
) {
  const [edit, setEdit] = useState(false);
  const [showList, setShowList] = useState(false);
  console.log(fullDetails);
  const refreshFriend = {
    value: val,
    action: refresh,
  };

  if (edit === false && showList === false)
    return (
      <div className="card">
        <div className="card__friend">
          <img src={photo} alt="" className="card__friend__photo" />
          <div className="card__friend__info">
            <div className="card__friend__info__name">{name}</div>
            <div className="card__friend__info__category">{category}</div>
          </div>
        </div>
        {returnActions(
          isFriend,
          setShowList,
          setEdit,
          deleteFriend,
          refresh,
          id,
          val,
          currentUser,
          isRequest,
          reqId,
          fullDetails
        )}
      </div>
    );
  else if (showList === false)
    return returnEditFriend(fullDetails, setEdit, refreshFriend);
  else {
    let tempId = fullDetails.receiver_id;

    if (isRequest == true || isFriend == false) tempId = fullDetails.id;
    return returnFriendList(tempId, name, fullDetails, setShowList);
  }
}

function returnActions(
  isFriend,
  setShowList,
  setEdit,
  deleteFriend,
  refresh,
  id,
  val,
  currentUser,
  isRequest,
  reqId,
  fullDetails
) {
  if (isFriend != false && isRequest != true)
    return (
      <div className="card__actions">
        <div className="card__actions__sendMail">
          <a
            href={
              "mailto:" +
              fullDetails.User.email +
              "?subject=%5BAnti-Food%20Waste%5D%20Look%20at%20my%20list&body=Hi%20" +
              fullDetails.User.name +
              "%2C%0D%0AI%20want%20you%20to%20look%20at%20my%20list%20of%20valid%20products%2C%20I%20think%20you'll%20find%20something%20you'll%20like.%0D%0A%0D%0AYou%20can%20find%20the%20application%20here%3A%0D%0Ahttps%3A%2F%2Fgithub.com%2FBaltacMihai%2FAnti-Food-Waste-App"
            }
          >
            <span className="icon-mail"></span>
          </a>
        </div>
        <div
          className="card__actions__list"
          onClick={() => {
            setShowList(true);
          }}
        >
          <span className="icon-list2"></span>
        </div>
        <div
          className="card__actions__edit"
          onClick={() => {
            setEdit(true);
          }}
        >
          <span className="icon-pencil"></span>
        </div>
        <div
          className="card__actions__delete"
          onClick={() => {
            deleteFriend(id);
            refresh(!val);
          }}
        >
          <span className="icon-bin2"></span>
        </div>
      </div>
    );
  else if (isRequest != true)
    return (
      <div className="card__actions">
        <div
          className="card__actions__list"
          onClick={() => {
            setShowList(true);
          }}
        >
          <span className="icon-list2"></span>
        </div>
        <div
          className="card__actions__add"
          onClick={() => {
            acceptFriend(id, currentUser, reqId);
          }}
        >
          <span className="icon-user-plus"></span>
        </div>
      </div>
    );
  else
    return (
      <div className="card__actions">
        <div
          className="card__actions__list"
          onClick={() => {
            setShowList(true);
          }}
        >
          <span className="icon-list2"></span>
        </div>
        <div
          className="card__actions__add"
          onClick={() => {
            addFriend(id, currentUser, reqId);
            refresh(val);
          }}
        >
          <span className="icon-checkmark"></span>
        </div>
      </div>
    );
}

function deleteFriend(id) {
  if (id) {
    const URL =
      "http://localhost:8081/api/friendshipRelation/deleteFriend/" + id;

    fetch(URL, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function returnEditFriend(fullDetails, setEdit, refreshFriend) {
  return (
    <EditFriend data={fullDetails} setEdit={setEdit} refresh={refreshFriend} />
  );
}

function returnFriendList(id, userName, fullDetails, setShowList) {
  return (
    <FoodMenu
      userId={id}
      userName={userName}
      isYou={false}
      relationshipDetails={fullDetails}
      close={setShowList}
    />
  );
}

async function addFriend(id, currentUserId, reqId) {
  await postFriendRelation(id, currentUserId);
  await postFriendRelation(currentUserId, id);

  await deleteFriendRequest(reqId);
}

async function postFriendRelation(firstUser, secondUser) {
  const URL = "http://localhost:8081/api/friendshipRelation/postFriendShip";

  const body = {
    sender_id: firstUser,
    receiver_id: secondUser,
    category: "Unset",
  };

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
    })
    .catch((error) => {
      console.log(error);
    });
}

async function deleteFriendRequest(reqId) {
  const URL =
    "http://localhost:8081/api/friendshipRequest/deleteFriendRequests/" + reqId;

  fetch(URL, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function acceptFriend(id, currentUserId) {
  const URL = "http://localhost:8081/api/friendshipRequest/postFrRequest";

  const isoDateString = new Date().toISOString();

  const body = {
    sender_id: currentUserId,
    receiver_id: id,
    date: isoDateString,
  };

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
    })
    .catch((error) => {
      console.log(error);
    });
}
export default CardFriend;
