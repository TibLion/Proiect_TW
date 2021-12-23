import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

import loginPhoto from "./../assests/image/login.svg";
import registerPhoto from "./../assests/image/register.svg";

function LoginCycle(setUser) {
  const [switchLoginRegister, SetSwitchLoginRegister] = useState(1);

  return returnLoginLayout(setUser);
}

function returnLoginLayout(setUser) {
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

          <div className="login__container__form__inputs">
            <input type="text" placeholder="Email" id="email" />
            <input type="password" placeholder="Password" id="password" />
          </div>

          <div
            className="button"
            onClick={(e) => {
              const email = document.getElementById("email").value;
              const pass = document.getElementById("password").value;

              const URL =
                "http://localhost:8081/api/user/verifyUser/" +
                email +
                "/" +
                pass;
              console.log(URL);

              fetch(URL, {
                headers: {
                  "Content-Type": "application/json",
                },
                mode: "no-cors",
                method: "GET",
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <span>Login</span> <span>{"->"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCycle;
