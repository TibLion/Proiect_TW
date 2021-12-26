import React from "react";

function CardItems(props) {
  return returnCarditem(
    props.photo,
    props.name,
    props.category,
    props.description,
    props.expirationDate
  );
}

function returnCarditem(photo, name, category, description, expirationDate) {
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
      <div className="card__actions">
        <div className="card__actions__edit">
          <span className="icon-pencil"></span>
        </div>
        <div className="card__actions__delete">
          <span className="icon-bin2"></span>
        </div>
        <div className="card__actions__available">
          <span className="icon-share"></span>
        </div>
        <div className="card__actions__socialMedia">
          <span className="icon-share2"></span>
        </div>
      </div>
    </div>
  );
}

//this function iterpret the data format in one more common and easy to read
function generateData(data) {
  return data.slice(8, 10) + "." + data.slice(5, 7) + "." + data.slice(0, 4);
}
export default CardItems;
