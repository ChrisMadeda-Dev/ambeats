import "../styles/musicplayer.css";

const MusicPlayer = ({ src }) => {
  return (
    <div className="music-player">
      <audio src={src} controls />
    </div>
  );
};

export default MusicPlayer;
