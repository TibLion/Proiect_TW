import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

import loginPhoto from "./../assests/image/login.svg";
import registerPhoto from "./../assests/image/register.svg";

function LoginCycle(props) {
  const [switchLoginRegister, SetSwitchLoginRegister] = useState(1);

  return returnLoginLayout(props.setUser);
}

function returnLoginLayout(setUser) {
  let accountInfo = {
    email: "",
    password: "",
  };

  return (
    <div className="App">
      <Navbar />
      <div className="row login__container">
        <img src={loginPhoto} />

        <div className="column login__container__form">
          <div className="login__container__form__info">
            <h2 className="login__container__form__info__title">Sign in</h2>
            <p className="login__container__form__info__subtitle">
              Don't have an account yet? <span>Sign Up.</span>
            </p>
          </div>

          <form className="login__container__form__inputs">
            <input
              type="text"
              placeholder="Email"
              id="email"
              onChange={(e) => (accountInfo.email = e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => (accountInfo.password = e.target.value)}
            />
          </form>

          <div
            className="button"
            onClick={(e) => submitLogin(accountInfo, setUser)}
          >
            <span>Login</span> <span>{"->"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function submitLogin(accountInfo, setUser) {
  {
    console.log(accountInfo);
    const URL =
      "http://localhost:8081/api/user/verifyUser/" +
      accountInfo.email +
      "/" +
      accountInfo.password;
    console.log(URL);

    await fetch(URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        // setUser(result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default LoginCycle;
