import { Link } from "react-router-dom";
import "../styles/profile.css";
import MusicCont from "./MusicCont";

const Profile = () => {
  const userName = localStorage.getItem("user-name");
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const musicId = (userId / 9901) * 1099;

  function logUserOut() {
    const a = prompt("Type yes to log Out");

    if (a === "yes" || a === "Yes") {
      localStorage.clear();
      alert("You successfuly logged out");
      window.location.href = "/";
    } else {
      alert("You not logged Out");
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-cont">
        <div className="profile-top">
          <h1>Hi {userName}</h1>
        </div>
        <div className="profile-center">
          <ul>
            <li>
              <Link className="link-text" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link-text" to="/playlist">
                My Playlist
              </Link>
            </li>
            <li>
              <button className="log-out-btn" onClick={logUserOut}> Log out </button>
            </li>
          </ul>
        </div>
        <div className="profile-bottom">
          <span>Music ID : {musicId}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
