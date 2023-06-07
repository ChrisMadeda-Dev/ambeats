import "../styles/musicsec.css";
import MusicCont from "./MusicCont";
import MusicPlayer from "./MusicPlayer";
import song from "../audios/1.mp3";
import { useEffect, useRef, useState } from "react";
import app from "./Firebase";

import {CgClose} from 'react-icons/cg'

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";


// Shows my avalable playlist
const MyPlList = ({ song, tglMyPll }) => {
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const [playList, setPlayList] = useState([]);

  const db = getFirestore(app);
  const plRef = collection(db, `users/${userId}/playList`);

  function addPlId(a) {
    const playlistRef = doc(
      db,
      `users/${userId}/playList/${a.playListId}/songs/${song.name}`
    );
    setDoc(playlistRef, song);
    alert("Great!! Song is added to playlist");
  }

  useEffect(() => {
    function getPlayList() {
      var array = [];

      getDocs(plRef).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });
        setPlayList([...array]);
      });
    }

    getPlayList();
  }, []);

  return (
    <div className="my-pl-list">
      <ul>
        <span onClick={tglMyPll}><CgClose/></span>
        {playList.map((a) => (
          <li key={Math.random()} onClick={(e) => addPlId(a)}>
            {" "}
            {a.playListName}
          </li>
        ))}
      </ul>
    </div>
  );
};


// The Music Section
const MusicSec = ({ musicID, playListId }) => {
  const [tglMyPll, SetTglMyPll] = useState(false);
  const [toPlSong, setToPlSong] = useState();
  const userId = musicID;
  const playingSong = useRef();
  const songsRef = useRef();
  const [currentSong, setCurrentSong] = useState(
    "https://firebasestorage.googleapis.com/v0/b/ambeats21-2f1be.appspot.com/o/Minister%20GUC%20-%20Yours%20(LIVE).mp3?alt=media&token=9bb6d7dd-7cc9-447d-b768-ba8d951303df"
  );
  const [songs, setSongs] = useState([]);

  //Firestore
  const db = getFirestore(app);
  songsRef.current = collection(db, `users/${userId}/songs`);

  //adjust the songsref to the playlist Ref if playlist is selected
  if (playListId !== undefined) {
    const id = parseFloat(localStorage.getItem("user-phone"));
    songsRef.current = collection(
      db,
      `users/${id}/playList/${playListId}/songs`
    );
  }

  //Set audio to a playList
  function setToPl(song) {
    SetTglMyPll(!tglMyPll);
    setToPlSong(song);
    console.log(song);
  }

  //Sets the details of the current song and its src
  function setSong(src) {
    setCurrentSong(src);
    songs.filter((a) => {
      if (a.src === src) {
        playingSong.current = a;
      }
    });
  }

  // Handles what happen when a song ends
  // Handles previous and next

  function handleEnded(state) {
    var array = [];
    songs.map((song) => array.push(song.src));

    if (array.length >= 1) {
      const songNum = array.indexOf(currentSong);

      if (songNum < array.length) {
        if (songNum >= 0) {
          var songRef;
          state && setCurrentSong(array[songNum + 1]);
          !state && setCurrentSong(array[songNum - 1]);

          state && setSong(array[songNum + 1]);
          !state && setSong(array[songNum - 1]);
        } else {
          setCurrentSong(array[0]);
        }
      } else {
        setCurrentSong(array[0]);
      }
    }
  }

  // gets songs from the datbase
  useEffect(() => {
    function getSongs() {
      var array = [];
      getDocs(songsRef.current).then((docs) => {
        docs.forEach((doc) => {
          array.push(doc.data());
        });
        setSongs([...array]);
      });
    }

    getSongs();
  }, []);

  return (
    <>
      <div className="music-sec">
        {songs.map((song) => (
          <MusicCont
            key={Math.random()}
            song={song}
            setSong={setSong}
            setToPl={setToPl}
          />
        ))}
      </div>
      <MusicPlayer
        playingSong={playingSong.current}
        src={currentSong}
        handleEnded={handleEnded}
      />
      {tglMyPll && (
        <MyPlList song={toPlSong} tglMyPll={(e) => SetTglMyPll(!tglMyPll)} />
      )}
    </>
  );
};

export default MusicSec;
