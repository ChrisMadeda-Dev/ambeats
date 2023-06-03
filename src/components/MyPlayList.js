import { useEffect, useState } from "react";
import "../styles/playlistpage.css";
import app from "./Firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";

const MyPlCont = ({ playList }) => {
  const linkStyle = { textDecoration: "none", padding:'15px' };
  function setPlId() {
    localStorage.setItem("play-list-id", playList.playListId);
  }
  return (
    <div className="my-pl-cont" onClick={setPlId}>
      <Link to="/playlistroom" style={linkStyle}>
        <p>{playList.playListName}</p>
        <span style={{ fontSize: "12px" }}>{playList.playListId}</span>
      </Link>
    </div>
  );
};

const MyPlayList = () => {
  const [myPlayList, setMyPlayList] = useState([]);

  const userId = parseFloat(localStorage.getItem("user-phone"));
  const db = getFirestore(app);

  useEffect(() => {
    // Get user playlist
    function getMyPlayList() {
      const plRef = collection(db, `users/${userId}/playList`);
      var array = [];
      getDocs(plRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });
        setMyPlayList([...array]);
      });
    }

    getMyPlayList();
  }, []);

  return (
    <div className="my-play-list">
      {myPlayList.map((a) => (
        <MyPlCont key={Math.random()} playList={a} />
      ))}
      {myPlayList.length === 0 && <p> No PlayList </p>}
    </div>
  );
};

export default MyPlayList;
