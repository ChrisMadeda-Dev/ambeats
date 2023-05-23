import "../styles/musicplayer.css";

const MusicPlayer = ({ src, handleEnded }) => {
  return (
    <div className="music-player">
      <audio
        style={{ backgroundColor: "1b1b1b" }}
        src={src}
        controls
        autoPlay
        onEnded={handleEnded}
      />
    </div>
  );
};

export default MusicPlayer;
