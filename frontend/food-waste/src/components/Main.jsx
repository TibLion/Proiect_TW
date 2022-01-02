import React from "react";
import { useState } from "react";
import FoodMenu from "./FoodMenu";
import FriendsMenu from "./FriendsMenu";
import LoginCycle from "./LoginCycle";
import MainPage from "./MainPage";

import Navbar from "./Navbar";

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
  //Here I show the main components of the page when is logged In

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
        Browse Item
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
        Browse People
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
        Browse in your food
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
        Browse in your Friends
      </div>
    );
  else if (pageToShow === "icon-users")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        Notification Friend request
      </div>
    );
  else if (pageToShow === "icon-calendar")
    return (
      <div className="">
        {" "}
        <Navbar
          info={infoForNavbar}
          showMenu={setPageToShow}
          currentPage={pageToShow}
          setPage={setPageToShow}
        />
        Notification Expiration Request
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
        Notification Food Request
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
