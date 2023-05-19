import "../styles/listenpage.css";
import MusicSec from "./MusicSec";

import app from "./Firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const ListenRoom = () => {
  const [recName, setRecName] = useState("Name");
  const recMusicID =
    (parseFloat(localStorage.getItem("rec-music-id")) / 1099) * 9901;
  const recID = recMusicID;

  const db = getFirestore(app);
  const recRef = doc(db, `users/${recID}`);

  useEffect(() => {
    function getRecDet() {
      getDoc(recRef).then((snap) => {
        setRecName(snap.data().name);
      });
    }

    getRecDet();
  }, []);

  return (
    <div className="listen-room-page">
      <div className="lr-cont">
        <div className="lr-top">
          <h1>{recName} Music</h1>
        </div>
        <div className="lr-center">
          <MusicSec musicID={recMusicID} />
        </div>
        <div className="lr-bottom"></div>
      </div>
    </div>
  );
};

export default ListenRoom;
