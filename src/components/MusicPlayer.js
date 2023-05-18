import "../styles/musicplayer.css";

const MusicPlayer = ({ src, handleEnded }) => {
  return (
    <div className="music-player">
      <audio src={src} controls autoPlay onEnded={handleEnded} />
    </div>
  );
};

export default MusicPlayer;
