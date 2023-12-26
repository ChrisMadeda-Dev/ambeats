import "../styles/playlistpage.css";
import app from "./Firebase";
import {
  getFirestore,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import MyPlayList from "./MyPlayList";

const PLayListPage = () => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const db = getFirestore(app);

  function addPlayList() {
    const a = prompt("Enter PLayList Name");
    const b = Math.random() * 99011099 * Math.random() * 10999901;

    if (a && a.length >= 3 && b) {
      const plRef = doc(db, `users/${userId}/playList/${b}`);

      const out = {
        playListName: a,
        playListId: b,
        totalSongs: 0,
        userId: userId,
        time: serverTimestamp(),
      };

      setDoc(plRef, out);

      alert("Done. Your PlayList is Set");
    } else {
      if (!a) {
        return;
      } else {
        a.length < 3 && alert("Please input name with atleast 3 characters");
      }
    }
    console.log(b);
  }

  return (
    <div className="play-list-page">
      <div className="plp-cont">
        <div className="plp-top">
          <h1>MY PLAYLIST</h1>
        </div>
        <div className="plp-center">
          <MyPlayList />
        </div>
        <div className="plp-bottom">
          <button className="add-playlist-btn" onClick={addPlayList}>Add PlayList</button>
        </div>
      </div>
    </div>
  );
};

export default PLayListPage;
