import React from "react";
import { useState } from "react";
import LoginCycle from "./LoginCycle";
import MainPage from "./MainPage";

import Navbar from "./Navbar";

function Main() {
  const [user, setUser] = useState(null);
  const [pageToShow, setPageToShow] = useState("main");

  if (!user) return returnLoginCycle(setUser);
  else {
    const infoForNavbar = { name: user[0].name, photo: user[0].photo };

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
        Your Items Page
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
        Your Friends Page
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
