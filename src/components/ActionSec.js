import { useState } from "react";
import "../styles/homesec.css";
import UploadSec from "./UploadSec";
import { BiHomeAlt2, BiSearchAlt, BiPlus } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

const ActionSec = ({ userDet }) => {
  const [toggleUploadSec, setToggleUploadSec] = useState(false);
  const linkStyle = { color: "white", textDecoration: "none" };

  function toggleUpldSec() {
    setToggleUploadSec(!toggleUploadSec);
  }

  return (
    <>
      <div className="action-sec">
        <div className="act-det-sec">
          <section></section>
          <span> Hi {userDet.name} </span>
        </div>
        <ul>
          <li>
            <BiHomeAlt2 /> <span>Home</span>
          </li>
          <li>
            <Link to={"/profile"} style={linkStyle}>
              <BsPerson /> <span>Profile</span>
            </Link>
          </li>

          <li>
            <BiSearchAlt /> <span>search</span>
          </li>

          <li> <Link to={'/playlist'}>PLay List</Link></li>
        </ul>
        <button onClick={toggleUpldSec}> Upload</button>
      </div>{" "}
      {toggleUploadSec && <UploadSec toggleUpldSec={toggleUpldSec} />}
    </>
  );
};

export default ActionSec;
