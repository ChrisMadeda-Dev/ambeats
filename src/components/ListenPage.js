import { useEffect, useState } from "react";
import "../styles/listenpage.css";
import { Link } from "react-router-dom";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";
import ActionSec from "./ActionSec";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import app from "./Firebase";

const ListenInboxCont = ({ doc, tglListenBox }) => {
  const linkStyle = { color: "white", textDecoration: "none" };
  function addRecMusicID(userId, recId) {
    const Id = tglListenBox ? userId : recId;
    const convert = (Id / 9901) * 1099;
    localStorage.setItem("rec-music-id", convert);
  }

  return (
    <div
      className="li-cont"
      onClick={(e) => addRecMusicID(doc.userId, doc.recId)}
    >
      <span>
        {tglListenBox && (
          <Link to={"/listenroom"} style={linkStyle}>
            {tglListenBox && doc.userName}
          </Link>
        )}
        {!tglListenBox && doc.recName}
      </span>
    </div>
  );
};

const Listen = () => {
  const userName = localStorage.getItem("user-name");
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const myMusicID = (userId / 9901) * 1099;
  const [recMusicID, setRecMusicID] = useState();
  const [togLr, setTogLr] = useState(false);

  //Database
  const [tglListenBox, setTglListenBox] = useState(true);
  const [listenInbox, setListenInbox] = useState([]);
  const [listenOutbox, setListenOutbox] = useState([]);
  const db = getFirestore(app);

  function addMusicID() {
    const a = prompt("Enter Music ID");

    if (a) {
      localStorage.setItem("rec-music-id", a);
      setTogLr(!togLr);
    } else {
      alert("No Music ID was added");
    }
  }

  function shareMusicID() {
    const a = prompt("Enter Recepient Phone Number");

    if (a && a.length === 9) {
      const recID = parseFloat(a) * 1099;
      const litenInboxRef = doc(db, `users/${recID}/listenInbox/${userId}`);
      const listenOutboxRef = doc(db, `users/${userId}/listenOutbox/${recID}`);

      const recBoxRef = doc(db, `users/${recID}`);
      getDoc(recBoxRef).then((snap) => {
        if (snap.exists()) {
          const out = {
            recName: snap.data().name,
            recId: recID,
            userId: userId,
            userName: userName,
            time: serverTimestamp(),
          };
          setDoc(litenInboxRef, out);
          setDoc(listenOutboxRef, out);
          alert("Great, your ID has been shared");
        } else {
          alert("User is not available");
        }
      });
    } else {
      alert("error");
    }
  }

  useEffect(() => {
    function getListenInbox() {
      const litenInboxRef = collection(db, `users/${userId}/listenInbox`);
      var array = [];
      getDocs(litenInboxRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });

        setListenInbox([...array]);

        //alert("error");
      });
    }

    getListenInbox();

    function getListenOutbox() {
      const litenOutboxRef = collection(db, `users/${userId}/listenOutbox`);
      var array = [];
      getDocs(litenOutboxRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });

        setListenOutbox([...array]);

        //alert("error");
      });
    }

    getListenOutbox();
  }, []);

  return (
    <div className="listen-page">
      <div className="listen-cont">
        <div className="listen-top">
          <h1>Listen</h1>
        </div>
        <div className="listen-center">
          <div className="listen-action-sec">
            <section onClick={shareMusicID}>Share Music ID</section>
            <section>
              {!togLr ? (
                <span onClick={addMusicID}> Add Music ID</span>
              ) : (
                <Link to={"/listenroom"}> Nice Listen to Songs</Link>
              )}{" "}
            </section>
          </div>
          <div className="li-header">
            <span onClick={(e) => setTglListenBox(true)}>
              {" "}
              <CiInboxIn style={{ fontSize: "20px" }} />{" "}
            </span>
            <span onClick={(e) => setTglListenBox(false)}>
              <CiInboxOut style={{ fontSize: "20px" }} />
            </span>
            <span>{tglListenBox ? "Inbox" : "Outbox"}</span>
          </div>
          <ul className="listen-inbox">
            {tglListenBox &&
              listenInbox.map((a) => (
                <ListenInboxCont
                  doc={a}
                  key={Math.random()}
                  tglListenBox={tglListenBox}
                />
              ))}

            {!tglListenBox &&
              listenOutbox.map((a) => (
                <ListenInboxCont
                  doc={a}
                  key={Math.random()}
                  tglListenBox={tglListenBox}
                />
              ))}

            {listenInbox.length === 0 && tglListenBox && (
              <span className="no-id">No received ID</span>
            )}
            {listenOutbox.length === 0 && !tglListenBox && (
              <span className="no-id">"No shared ID</span>
            )}
          </ul>
        </div>
        <div className="listen-bottom">
          <span>Your Music ID : {myMusicID}</span>
        </div>
      </div>
    </div>
  );
};

export default Listen;
