import React from "react";
import { useState } from "react";
import LoginCycle from "./LoginCycle";
import Navbar from "./Navbar";

function Main() {
  const [user, setUser] = useState(null);
  console.log(user);
  if (!user) return <LoginCycle setUser={setUser} />;
  else {
    const infoForNavbar = { name: user[0].name, photo: user[0].photo };

    return (
      <div className="App">
        <Navbar info={infoForNavbar} />
        <p>Local</p>
      </div>
    );
  }
}

export default Main;
