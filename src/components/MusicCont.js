import "../styles/musicsec.css";
import { BiPlayCircle } from "react-icons/bi";
import app from "./Firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const MusicCont = ({ song, setSong, setToPl }) => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const db = getFirestore(app);

  function addToPlayList() {
    const a = prompt("Enter Play List ID");
    if (a) {
      const playlistRef = doc(
        db,
        `users/${userId}/playList/${a}/songs/${song.name}`
      );
      setDoc(playlistRef, song);
      alert("Added to playlist");
    }
  }

  return (
    <div className="music-cont" onDoubleClick={(e) => setToPl(song)}>
      <section onClick={(e) => setSong(song.src)}>
        <BiPlayCircle style={{ fontSize: "20px" }} />
      </section>
      <div className="music-cont-det" onClick={(e) => setSong(song.src)}>
        <section>{song.name}</section>
        <span>{song.size}</span>
      </div>
    </div>
  );
};

export default MusicCont;
