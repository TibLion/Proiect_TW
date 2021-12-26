import React from "react";

function CardFriend(props) {
  return returnCardFriend(props.photo, props.name, props.category);
}

function returnCardFriend(photo, name, category) {
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
        <div className="card__actions__delete">
          <span className="icon-bin2"></span>
        </div>
      </div>
    </div>
  );
}

export default CardFriend;
