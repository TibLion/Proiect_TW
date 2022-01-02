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
    props.currentUser
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
  currentUser
) {
  const [edit, setEdit] = useState(false);
  const [showList, setShowList] = useState(false);

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
          currentUser
        )}
      </div>
    );
  else if (showList === false)
    return returnEditFriend(fullDetails, setEdit, refreshFriend);
  else
    return returnFriendList(
      fullDetails.receiver_id,
      name,
      fullDetails,
      setShowList
    );
}

function returnActions(
  isFriend,
  setShowList,
  setEdit,
  deleteFriend,
  refresh,
  id,
  val,
  currentUser
) {
  if (isFriend != false)
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
  else
    return (
      <div className="card__actions">
        <div
          className="card__actions__add"
          onClick={() => {
            console.log(currentUser);
            addFriend(id, currentUser);
          }}
        >
          <span className="icon-user-plus"></span>
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

async function addFriend(id, currentUserId) {
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
