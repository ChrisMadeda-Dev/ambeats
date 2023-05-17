import "../styles/musicsec.css";
import { BiPlayCircle } from "react-icons/bi";

const MusicCont = ({ song, setSong }) => {
  return (
    <div className="music-cont" onClick={(e) => setSong(song.src)}>
      <section>
        <BiPlayCircle style={{fontSize:'20px'}} />
      </section>
      <div className="music-cont-det">
        <section>{song.name}</section>
        <span>{song.size}</span>
      </div>
    </div>
  );
};

export default MusicCont;