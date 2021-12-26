import React from "react";

function CardFriend(props) {
  return returnCardFriend(props.photo, props.name, props.category, props.id);
}

function returnCardFriend(photo, name, category, id) {
  return (
    <div className="card">
      <div className="card__friend">
        <img src={photo} alt="" className="card__friend__photo" />
        <div className="card__friend__info">
          <div className="card__friend__info__name">{name}</div>
          <div className="card__friend__info__category">{category}</div>
        </div>
      </div>
      <div className="card__actions">
        <div className="card__actions__list">
          <span className="icon-list2"></span>
        </div>
        <div className="card__actions__edit">
          <span className="icon-pencil"></span>
        </div>
        <div
          className="card__actions__delete"
          onClick={() => {
            deleteFriend(id);
          }}
        >
          <span className="icon-bin2"></span>
        </div>
      </div>
    </div>
  );
}

function deleteFriend(id) {
  console.log(id);
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

export default CardFriend;
