import { useState } from "react";
import "../styles/homesec.css";
import UploadSec from "./UploadSec";
import { BiHomeAlt2, BiSearchAlt, BiPlus } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

const ActionSec = ({ userDet }) => {
  const [toggleUploadSec, setToggleUploadSec] = useState(false);

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
            <BiHomeAlt2 /> Home
          </li>
          <li>
            <Link to={"/profile"}>
              <BsPerson /> Profile
            </Link>
          </li>
          <li>
            <Link to={"/listenpage"}>
              <BsPerson /> Listen
            </Link>
          </li>
          <li>
            <BiSearchAlt /> search
          </li>
        </ul>
        <button onClick={toggleUpldSec}> Upload</button>
      </div>{" "}
      {toggleUploadSec && <UploadSec toggleUpldSec={toggleUpldSec} />}
    </>
  );
};

export default ActionSec;
