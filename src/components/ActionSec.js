import { useState } from "react";
import "../styles/homesec.css";
import UploadSec from "./UploadSec";

const ActionSec = () => {
  const [toggleUploadSec, setToggleUploadSec] = useState(false);

  function toggleUpldSec() {
    setToggleUploadSec(!toggleUploadSec);
  }

  return (
    <>
      <div className="action-sec">
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>Home</li>
          <li>Profile</li>
        </ul>
        <button onClick={toggleUpldSec}> Upload</button>
      </div>{" "}
      {toggleUploadSec && <UploadSec toggleUpldSec={toggleUpldSec} />}
    </>
  );
};

export default ActionSec;
