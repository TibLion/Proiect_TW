import React, { useState } from "react";

function MainPage(props) {
  return returnMainPage(props.currentUser);
}

function returnMainPage(infos) {
  let friends = ReturnFriendsList(infos);

  return (
    <div className="main__container">
      <div className="main__container__friends">
        <p className="main__container__friends__title"> Friends: </p>
        <div className="main__container__friends__list">
          {friends?.map((friend) => {
            console.log(friend);
            return (
              <div className="card__friend">
                <img
                  src={friend.User.photo}
                  alt=""
                  className="card__friend__photo"
                />
                <div className="card__friend__info">
                  <div className="card__friend__info__name">
                    {friend.User.name}
                  </div>
                  <div className="card__friend__info__category">
                    {friend.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="main__container__food">
        <p className="main__container__food__title">Food:</p>
        <div className="main__container__food__list">ELEMENTS</div>
      </div>
    </div>
  );
}

function ReturnFriendsList(infos) {
  let [friend, setFriend] = useState(null);
  const URL =
    "http://localhost:8081/api/friendshipRelation/getFriendshipRel/" + infos.id;

  if (friend == null)
    fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setFriend(result);
      })
      .catch((error) => {
        console.log(error);
      });

  if (friend != null) {
    return friend;
  }
}

export default MainPage;
