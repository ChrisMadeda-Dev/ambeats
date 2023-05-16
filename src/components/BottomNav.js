import { useState } from "react";
import "../App.css";
import UploadSec from "./UploadSec";

const BottomNav = () => {
  const [toggleUpldSec, setToggleUpldSec] = useState(false);
  function toggleUpldSecFunc() {
    setToggleUpldSec(!toggleUpldSec);
  }
  return (
    <>
      <div className="bottom-nav">
        <span>Home</span>
        <span>search</span>
        <span onClick={(e) => setToggleUpldSec(!toggleUpldSec)}>Upload</span>
      </div>
      {toggleUpldSec && <UploadSec toggleUpldSec={toggleUpldSecFunc} />}
    </>
  );
};

export default BottomNav;
