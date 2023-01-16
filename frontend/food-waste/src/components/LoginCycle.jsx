import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

import loginPhoto from "./../assests/image/loginfood.svg";
import registerPhoto from "./../assests/image/registerfood.svg";
import Popup from "./Popup";

function LoginCycle(props) {
  const [switchLoginRegister, setSwitchLoginRegister] = useState(1);

  if (switchLoginRegister == 1)
    return returnLoginLayout(props.setUser, setSwitchLoginRegister);
  else return returnRegisterLayout(props.setUser, setSwitchLoginRegister);
}

//#region Login

//This is the function which returns the Login Page
function returnLoginLayout(setUser, setSwitchLoginRegister) {
  //Object that helps to keep informations
  let accountInfo = {
    email: "",
    password: "",
  };

  return (
    <div>
      <Navbar />
      <div className="row login__container">
        <img src={loginPhoto} />

        <div className="column login__container__form">
          <div className="login__container__form__info">
            <h2 className="login__container__form__info__title">Sign in</h2>
            <p className="login__container__form__info__subtitle">
              Don't have an account yet?{" "}
              <span onClick={(e) => setSwitchLoginRegister(2)}>Sign Up.</span>
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
            className="button button--active"
            onClick={(e) => submitLogin(accountInfo, setUser)}
          >
            <span>Login</span> <span>{"->"}</span>
          </div>
        </div>
      </div>
      {popupLogin()}
    </div>
  );
}

// Function which returns all the popups in the page.
function popupLogin() {
  return (
    <div id="accountDoesntExist" className="displayNone">
      <Popup status={false} message={"The account doesn't exist"} />
    </div>
  );
}

// Verify and get the user account
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
        console.log(result);
        if (result.length > 0) setUser(result);
        else {
          const accountDoesntExist =
            document.getElementById("accountDoesntExist");
          console.log(accountDoesntExist.style);
          accountDoesntExist.style.display = "flex";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//#endregion

//#region Register

function returnRegisterLayout(setUser, setSwitchLoginRegister) {
  let accountInfo = {
    email: "",
    name: "",
    password: "",
    photo: "",
  };

  return (
    <div>
      <Navbar />
      <div className="row login__container">
        <img src={registerPhoto} />

        <div className="column login__container__form">
          <div className="login__container__form__info">
            <h2 className="login__container__form__info__title">
              Create account
            </h2>
            <p className="login__container__form__info__subtitle">
              Already have an account?{" "}
              <span onClick={(e) => setSwitchLoginRegister(1)}>Sign in.</span>
            </p>
          </div>

          <form className="login__container__form__inputs">
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => (accountInfo.name = e.target.value)}
            />
            <input
              type="url"
              placeholder="Link from your photo"
              id="photo"
              onChange={(e) => (accountInfo.photo = e.target.value)}
            />

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
              autoComplete="new-password"
              onChange={(e) => (accountInfo.password = e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat your password"
              onChange={(e) => {
                const passwordDoesntMatch = document.getElementById(
                  "passwordDoesntMatch"
                );
                const accountCreated =
                  document.getElementById("accountCreated");
                if (accountInfo.password != e.target.value) {
                  passwordDoesntMatch.style.display = "flex";
                  accountCreated.style.display = "none";
                } else {
                  passwordDoesntMatch.style.display = "none";
                }
              }}
            />
          </form>

          <div
            className="button button--active"
            onClick={(e) =>
              submitRegister(accountInfo, setUser, setSwitchLoginRegister)
            }
          >
            <span>Register</span> <span>{"->"}</span>
          </div>
        </div>
      </div>
      {popupRegister()}
    </div>
  );
}

function popupRegister() {
  return (
    <div>
      <div id="passwordDoesntMatch" className="displayNone">
        <Popup status={false} message={"Password doesn't match!"} />
      </div>
      <div id="accountCreated" className="displayNone">
        <Popup
          status={true}
          message={"Your account is created, please login"}
        />
      </div>
      <div id="sameEmail" className="displayNone">
        <Popup status={false} message={"Your email is already used"} />
      </div>
    </div>
  );
}

// Verify and get the user account
async function submitRegister(accountInfo, setUser, setSwitchLoginRegister) {
  {
    console.log(JSON.stringify(accountInfo));
    const URL = "http://localhost:8081/api/user/createNewUser";

    await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(accountInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const accountCreated = document.getElementById("accountCreated");
        const sameEmail = document.getElementById("sameEmail");
        if (result.message) {
          sameEmail.style.display = "flex";
          accountCreated.style.display = "none";
        } else {
          accountCreated.style.display = "flex";
          sameEmail.style.display = "none";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//#endregion
export default LoginCycle;
