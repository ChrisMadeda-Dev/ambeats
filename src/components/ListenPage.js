import { useState } from "react";
import "../styles/listenpage.css";
import { Link } from "react-router-dom";

const Listen = () => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const myMusicID = (userId / 9901) * 1099;
  const [recMusicID, setRecMusicID] = useState();
  const [togLr, setTogLr] = useState(false);

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
    const recID = parseFloat(a) * 1099;
  }
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
          <ul className="listen-inbox">
            <li>
              <span>Sam</span>
              <span>726376245245</span>
            </li>
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
