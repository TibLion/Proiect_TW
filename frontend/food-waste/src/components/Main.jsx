import React from "react";
import { useState } from "react";
import Browse from "./Browse";
import FoodMenu from "./FoodMenu";
import FriendsMenu from "./FriendsMenu";
import LoginCycle from "./LoginCycle";
import MainPage from "./MainPage";

import Navbar from "./Navbar";
import Notification from "./Notification";

function Main() {
  const [user, setUser] = useState(null);
  const [pageToShow, setPageToShow] = useState("main");
  if (!user) return returnLoginCycle(setUser);
  else {
    const infoForNavbar = {
      name: user[0].name,
      photo: user[0].photo,
      id: user[0].id,
    };

    return ReturnPageDecider(infoForNavbar, pageToShow, setPageToShow, user[0]);
  }
}

function returnLoginCycle(setUser) {
  return <LoginCycle setUser={setUser} />;
}

function ReturnPageDecider(infoForNavbar, pageToShow, setPageToShow, user) {
  //Shows the main components of the page when logged in

  if (pageToShow === "main")
    return (
      <div>
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <MainPage currentUser={user} />
      </div>
    );
  else if (pageToShow === "items")
    return (
      <div>
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <FoodMenu userId={user.id} userName={user.name} isYou={true} />
      </div>
    );
  else if (pageToShow === "friends")
    return (
      <div>
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <FriendsMenu userId={user.id} />
      </div>
    );
  else if (pageToShow === "browseItem")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Browse type={"item"} currentUser={user.id} />
      </div>
    );
  else if (pageToShow === "browsePeople")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Browse type={"people"} currentUser={user.id} />
      </div>
    );
  else if (pageToShow === "browseInYourFood")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Browse type={"yitem"} currentUser={user.id} />
      </div>
    );
  else if (pageToShow === "browseInYourFriends")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Browse type={"ypeople"} currentUser={user.id} />
      </div>
    );
  else if (pageToShow === "icon-users") {
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Notification type={"friend"} currentUser={user.id} />
      </div>
    );
  } else if (pageToShow === "icon-calendar")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Notification type={"expiration"} currentUser={user.id} />
      </div>
    );
  else if (pageToShow === "icon-spoon-knife")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        <Notification type={"food"} currentUser={user.id} />
      </div>
    );
  return (
    <div className="App">
      <Navbar
        info={infoForNavbar}
        showMenu={setPageToShow}
        currentPage={pageToShow}
        setPage={setPageToShow}
      />
      <p>404 Page</p>
    </div>
  );
}

export default Main;
