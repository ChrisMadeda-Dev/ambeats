import "../styles/musicsec.css";

const MusicCont = ({ song, setSong }) => {
  return (
    <div className="music-cont" onClick={(e) => setSong(song.src)}>
      <section></section>
      <div className="music-cont-det">
        <p>{song.name}</p>
        <span>{song.size}</span>
      </div>
      <div></div>
    </div>
  );
};

export default MusicCont;
