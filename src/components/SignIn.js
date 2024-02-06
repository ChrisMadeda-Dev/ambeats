import "../styles/signin.css";
import { useState } from "react";
//Firabase
import app from "./Firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";
//navigate=useNavigate()

const SignIn = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleLogIn, setToggleLogIn] = useState(false);
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [pin, setPin] = useState();
  const [pin2, setPin2] = useState();
  const [phone2, setPhone2] = useState();

  //Firebase
  const db = getFirestore(app);

  //adding user details to the database
  async function addUser() {
    //Adds a passcode
    const passcode = parseFloat(prompt("Enter Pass Code"));
    const phone3 = parseFloat(phone2) * 1099;
    const key = parseFloat(pin2) + 9901;

    if (
      name &&
      phone &&
      pin &&
      pin === pin2 &&
      phone === phone2 &&
      phone.length === 9 &&
      passcode === 1111111111
    ) {
      const userDet = {
        name: name,
        phone: phone3,
        pin: pin2,
        key: key,
        createdAt: serverTimestamp(),
      };

      //Add to firebase
      const docRef = doc(db, `users/${phone3}`);

      //Check if user exists
      const userInfo = await getDoc(docRef);

      if (!userInfo.exists()) {

        //Execute if user does not exist
        await setDoc(docRef, userDet);
        setToggle(!toggle);

        alert("Thank you for joining myammusic :)");

        //set user info on the localstorage
        localStorage.setItem("user-name", name);
        localStorage.setItem("user-phone", phone3);

        //Take to home
        window.location.href = "/";
      } else {
        //if user is available
        alert("User already exists");
        localStorage.clear();
      }
    } else {
      passcode !== 1111111111 && alert("Wrong pass code");
      pin !== pin2 && alert("Confirm if Pin Matches");
      phone !== phone2 && alert("Confirm Phone Number Matches");
      phone.length !== 9 &&
        alert(
          "Please check your phone number . (Format : 7********* , 9 digits,0 not included, start with 7....) "
        );

      if (pin === pin2 && phone === phone2 && phone.length === 9) {
        alert("Please confirm your details");
      }
    }
  }

  async function logInUser() {
    const passcode = parseFloat(prompt("Enter Pass Code"));

    if (phone && pin && phone.length === 9 && passcode === 1111111111) {
      const phoneNum = phone * 1099;
      const userRef = doc(db, `users/${phoneNum}`);
      const userDoc = await getDoc(userRef);

      //Checks for userInfo in db
      if (userDoc.exists()) {
        if (userDoc.data().pin === pin) {
          localStorage.setItem("user-name", userDoc.data().name);
          localStorage.setItem("user-phone", phoneNum);

          alert(
            "Welcome back, Great to have you again. Have a blust. Remember to keep it gospel"
          );
          window.location.href = "/";
          setToggle(!toggle);
        } else {
          alert("Please confirm your pin");
        }
      } else {
        alert("Phone number not found !!");
      }
    } else {
      passcode !== 1111111111 && alert("Wrong pass code");
      !phone && alert("Please add a phone number");
      !pin && alert("Please add pin");
      phone.length < 9 && alert("Invalid phone number");
    }
  }

  return (
    <div className="signin-page">
      <header>
        <h3>myambeats</h3>
      </header>
      {!toggleLogIn && (
        <div className="input-zone">
          <input
            type={"text"}
            placeholder="Enter Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type={"number"}
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type={"number"}
            placeholder="Confirm Phone Number"
            onChange={(e) => {
              setPhone2(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder="Enter Pin"
            onChange={(e) => {
              setPin(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder="Confirm Pin"
            onChange={(e) => {
              setPin2(e.target.value);
            }}
          />

          {!toggle && <button onClick={addUser}>Sign In</button>}
          {toggle && (
            <button>
              <Link to={"/"}>Home</Link>
            </button>
          )}

          <span onClick={(e) => setToggleLogIn(!toggleLogIn)}>
            log in Instead
          </span>
        </div>
      )}

      {toggleLogIn && (
        <div className="input-zone">
          <input
            type={"number"}
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder="Enter Pin"
            onChange={(e) => {
              setPin(e.target.value);
            }}
          />
          <button onClick={logInUser}>Log In</button>

          <span onClick={(e) => setToggleLogIn(!toggleLogIn)}>
            Sign up Instead
          </span>
        </div>
      )}
    </div>
  );
};

export default SignIn;
