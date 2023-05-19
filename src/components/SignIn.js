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

import { Link } from "react-router-dom";

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
  function addUser() {
    const phone3 = parseFloat(phone2) * 1099;
    const key = parseFloat(pin2) + 9901;

    if (
      name &&
      phone &&
      pin &&
      pin === pin2 &&
      phone === phone2 &&
      phone.length === 9
    ) {
      const userDet = {
        name: name,
        phone: phone3,
        pin: pin2,
        key: key,
        createdAt: serverTimestamp(),
      };

      localStorage.setItem("user-name", name);
      localStorage.setItem("user-phone", phone3);

      //Add to firebase
      const docRef = doc(db, `users/${phone3}`);

      setDoc(docRef, userDet);
      setToggle(!toggle);

      alert("Thank you for joining amchat40");
      alert("Go to chat page : CLick the button to get started");
    } else {
      pin !== pin2 && alert("Confirm if Pin Matches");
      phone !== phone2 && alert("Confirm Phone Number Matches");
      phone.length !== 9 &&
        alert(
          "Please check your phone number . (Format : 7********* , 9 digits) "
        );

      if (pin === pin2 && phone === phone2 && phone.length === 9) {
        alert("Please confirm your details");
      }
    }
  }

  async function logInUser() {
    if (phone && pin && phone.length === 9) {
      setPhone2(phone * 1099);
      const userRef = doc(db, `users/${phone2}`);

      await getDoc(userRef).then((snap) => {
        if (snap.exists()) {
          if (snap.data().pin === pin) {
            localStorage.setItem("user-name", snap.data().name);
            localStorage.setItem("user-phone", phone2);

            alert("Welcome back, Great to have you again");
            setToggle(!toggle);
          } else {
            alert("Please confirm your pin");
          }
        } else {
          alert("Invalid Phone number");
        }
      });
    } else {
      !phone && alert("Please add a phone number");
      !pin && alert("Please add pin");
      phone.length < 9 && alert("Invalid phone number");
    }
  }

  return (
    <div className="page signin-page">
      <header>
        <h3>amChat</h3>
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
          {!toggle && <button onClick={logInUser}>Log In</button>}
          {toggle && (
            <button>
              <Link to={"/"}>Home</Link>
            </button>
          )}

          <span onClick={(e) => setToggleLogIn(!toggleLogIn)}>
            Sign up Instead
          </span>
        </div>
      )}
    </div>
  );
};

export default SignIn;
