import "../styles/home.css";
import MusicSec from "./MusicSec";
import ActionSec from "./ActionSec";
import ThirdSec from "./ThirdSec";
import UploadSec from "./UploadSec";
import MusicPlayer from "./MusicPlayer";

const HomeHeader = () => {
  return (
    <header className="home-header">
      <h1>am beats 20</h1>
    </header>
  );
};

const HomeBarSec = () => {
  return (
    <div className="home-bar-sec">
      <div className="home-bar-block"></div>
      <div className="home-bar-block"></div>
      <div className="home-bar-block"></div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <ActionSec />
      <div className="home-center">
        <HomeHeader />
        <HomeBarSec />
        <MusicSec />
      </div>
      <ThirdSec />
    
    </div>
  );
};

export default Home;
