import "../styles/profile.css";
import MusicCont from "./MusicCont";

const Profile = () => {
  const userName = localStorage.getItem("user-name");
  const userId = parseFloat(localStorage.getItem("user-phone"));
  const musicId = (userId / 9901) * 1099;
  return (
    <div className="profile-page">
      <div className="profile-cont">
        <div className="profile-top">
          <h1>Hi {userName}</h1>
        </div>
        <div className="profile-center">
          <ul>
            <li>Share Music ID</li>
            <li>Share Music ID</li>
            <li>Share Music ID</li>
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
