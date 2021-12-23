import React from "react";
import { useState } from "react";
import LoginCycle from "./LoginCycle";
import Navbar from "./Navbar";

function Main() {
  const [user, setUser] = useState(null);
  console.log(user);
  if (!user) return LoginCycle(setUser);
  else {
    return (
      <div className="App">
        <Navbar />
        <p>Local</p>
      </div>
    );
  }
}

export default Main;
