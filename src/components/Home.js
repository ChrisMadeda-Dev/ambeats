import "../styles/home.css";
import MusicSec from "./MusicSec";
import ActionSec from "./ActionSec";
import ThirdSec from "./ThirdSec";
import UploadSec from "./UploadSec";
import MusicPlayer from "./MusicPlayer";
import BottomNav from "./BottomNav";
import ThirdSec2 from "./ThirdSec2";

import {
  BiHeart,
  BiHeadphone,
  BiHeading,
  BiSolidPlaylist,
} from "react-icons/bi";
import { MdFeaturedPlayList } from "react-icons/md";
import { CgPlayList } from "react-icons/cg";
import { useEffect, useState } from "react";

import app from "./Firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
    <header className="home-header">
      <h1>AmBeats </h1>
    </header>
  );
};

const HomeBarSec = () => {
  const iconStyle = { fontSize: "25px" };
  const linkStyle = { color: "#303030" };
  return (
    <div className="home-bar-sec">
      <div className="home-bar-block">
        <BiHeart style={iconStyle} />
      </div>
      <div className="home-bar-block">
        <Link to={"/listenpage"} style={linkStyle}>
          <BiHeadphone style={iconStyle} />
        </Link>
      </div>
      <div className="home-bar-block">
        <Link to="/playlist">
          {" "}
          <CgPlayList style={iconStyle} />
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  //6-feb-2024 userDet not in use
  const [userDet, setUserDet] = useState({ name: "Name" });
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const musicID = userId;

  const userName = localStorage.getItem("user-name");

  useEffect(() => {
    function getUserDet() {
      const db = getFirestore(app);
      const userDetRef = doc(db, `users/${userId}`);

      getDoc(userDetRef).then((snap) => {
        //if user info is available in db
        snap.data() !== undefined && setUserDet(snap.data());

        //clear data in localstorage if info not available in db
        snap.data() === undefined && localStorage.clear();
      });
    }

    getUserDet();
  }, []);

  return (
    <div className="home">
      <ActionSec userDet={userDet} userName={userName} />
      <div className="home-center">
        <HomeHeader />
        <HomeBarSec />
        <MusicSec musicID={musicID} />
      </div>
      <ThirdSec2 userDet={userDet} />
    </div>
  );
};

export default Home;
