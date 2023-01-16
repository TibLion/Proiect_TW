import React, { useState } from "react";
import { FacebookShareButton } from "react-share";
import EditItems from "./EditItems";

function CardItems(props) {
  const refreshAction = {
    value: props.val,
    action: props.refresh,
  };
  return ReturnCarditem(
    props.item.photo,
    props.item.name,
    props.item.category,
    props.item.description,
    props.item.expirationDate,
    props.item.isAvailable,
    props.item,
    refreshAction,
    props.isYou,
    props.relationshipDetails,
    props.item.id,
    props.friendDetails,
    props.relationId
  );
}

function ReturnCarditem(
  photo,
  name,
  category,
  description,
  expirationDate,
  isAvailable,
  allInfos,
  refreshAction,
  isYou,
  relationshipDetails,
  id,
  friendDetails,
  relationId
) {
  const [edit, setEdit] = useState(false);
  if (edit === false) {
    return (
      <div className="card">
        <div className="card__item">
          <img className="card__item__photo" src={photo}></img>
          <div className="card__item__content">
            <p className="card__item__content__title">{name}</p>
            <p className="card__item__content__category">{category}</p>
            <p className="card__item__content__description">{description}</p>
          </div>
        </div>
        <p className="card__item__expirationDate">
          {generateData(expirationDate)}
        </p>
        {returnOptions(
          name,
          category,
          description,
          isAvailable,
          allInfos,
          refreshAction,
          isYou,
          setEdit,
          relationshipDetails,
          id,
          friendDetails,
          relationId
        )}
      </div>
    );
  } else {
    return returnEditItem(allInfos, setEdit, refreshAction);
  }
}

function returnOptions(
  name,
  category,
  description,
  isAvailable,
  allInfos,
  refreshAction,
  isYou,
  setEdit,
  relationshipDetails,
  id,
  friendDetails,
  relationId
) {
  if (friendDetails == undefined) {
    if (isYou != undefined && isYou === false) {
      return (
        <div className="card__actions">
          <div
            className="card__action__claim"
            onClick={() => {
              postItemRequest(relationshipDetails, id);
            }}
          >
            <span className="icon-checkmark"></span>
          </div>
        </div>
      );
    } else
      return (
        <div className="card__actions">
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
              deleteItem(allInfos);
              refreshAction.action(!refreshAction.value);
            }}
          >
            <span className="icon-bin2"></span>
          </div>
          {returnShare(
            name,
            category,
            description,
            isAvailable,
            allInfos,
            refreshAction
          )}
        </div>
      );
  } else {
    return (
      <div className="card__actions">
        <div className="card__actions__userInfo">
          <p className="card__actions__userInfo__name">{friendDetails.name}</p>
          <img
            src={friendDetails.photo}
            className="card__actions__userInfo__photo"
          />
        </div>
        <div
          className="card__actions__add"
          onClick={() => {
            acceptFoodRequest(relationId, allInfos, friendDetails.id);
          }}
        >
          <span className="icon-checkmark"></span>
        </div>
      </div>
    );
  }
}

//return the Html content
function returnShare(
  name,
  category,
  description,
  isAvailable,
  allInfos,
  refreshAction
) {
  if (isAvailable) {
    return (
      <div className="row">
        <div
          className="card__actions__available card__actions__available--active"
          onClick={() => {
            changeAvailability(allInfos);
            refreshAction.action(!refreshAction.value);
          }}
        >
          <span className="icon-share"></span>
        </div>

        <FacebookShareButton
          url={"https://github.com/TibLion/Proiect_TW"}
          quote={"I don't want to waste " + name + ", so I share it with you!"}
          hashtag={"#" + category}
          description={description}
          className="card__actions__socialMedia"
        >
          <span className="icon-facebook"></span>
        </FacebookShareButton>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div
          className="card__actions__available"
          onClick={() => {
            changeAvailability(allInfos);
            refreshAction.action(!refreshAction.value);
          }}
        >
          <span className="icon-share"></span>
        </div>
      </div>
    );
  }
}

// change availability of the item
async function changeAvailability(allInfos) {
  const URL = "http://localhost:8081/api/item/putItem";

  const body = {
    id: allInfos.id,
    user_id: allInfos.user_id,
    name: allInfos.name,
    description: allInfos.description,
    quantity: allInfos.quantity,
    category: allInfos.category,
    expirationDate: allInfos.expirationDate,
    isAvailable: !allInfos.isAvailable,
  };

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
    })
    .catch((error) => {
      console.log(error);
    });
}

//delete function
function deleteItem(allInfos) {
  if (allInfos.id && allInfos.user_id) {
    const URL =
      "http://localhost:8081/api/Item//deleteItemById/" +
      allInfos.id +
      "/" +
      allInfos.user_id;

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

//edit function
function returnEditItem(fullDetails, setEdit, refreshAction) {
  return (
    <EditItems
      infos={fullDetails}
      setEdit={setEdit}
      refreshAction={refreshAction}
    />
  );
}

async function postItemRequest(relationshipDetails, id) {
  const URL = "http://localhost:8081/api/itemRequest/postItemRequest";
  const isoDateString = new Date().toISOString();
  const body = {
    sender_id: relationshipDetails.sender_id,
    receiver_id: relationshipDetails.receiver_id,
    date: isoDateString,
    item_id: id,
    status: "PENDING",
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

async function acceptFoodRequest(relationId, item, otherUserId) {
  let URL =
    "http://localhost:8081/api/itemRequest/accept/" +
    relationId +
    "/" +
    item.id;

  await fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  URL = "http://localhost:8081/api/item/putItem";

  const body = {
    id: item.id,
    user_id: otherUserId,
    name: item.name,
    description: item.description,
    quantity: item.quantity,
    category: item.category,
    expirationDate: item.expirationDate,
    isAvailable: 0,
    photo: item.photo,
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
    })
    .catch((error) => {
      console.log(error);
    });
}

function generateData(data) {
  if (data)
    return data.slice(8, 10) + "." + data.slice(5, 7) + "." + data.slice(0, 4);
}
export default CardItems;
