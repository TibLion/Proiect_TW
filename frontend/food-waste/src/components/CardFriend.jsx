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
          reqId
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
  reqId
) {
  console.log(reqId);
  if (isFriend != false && isRequest != true)
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
