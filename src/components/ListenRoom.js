import "../styles/listenpage.css";
import MusicSec from "./MusicSec";

const ListenRoom = () => {
  const recMusicID =
    (parseFloat(localStorage.getItem("rec-music-id")) / 1099) * 9901;
  return (
    <div className="listen-room-page">
      <div className="lr-cont">
        <div className="lr-top"> hey</div>
        <div className="lr-center">
          <MusicSec musicID={recMusicID} />
        </div>
        <div className="lr-bottom"></div>
      </div>
    </div>
  );
};

export default ListenRoom;
