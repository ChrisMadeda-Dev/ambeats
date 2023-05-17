import { useState } from "react";
import "../styles/homesec.css";
import UploadSec from "./UploadSec";
import { BiHomeAlt2, BiSearchAlt, BiPlus } from "react-icons/bi";

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
