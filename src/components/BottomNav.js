import { useState } from "react";
import "../App.css";
import UploadSec from "./UploadSec";
import { BiHomeAlt2, BiSearchAlt, BiPlus } from "react-icons/bi";

const BottomNav = () => {
  const [toggleUpldSec, setToggleUpldSec] = useState(false);
  function toggleUpldSecFunc() {
    setToggleUpldSec(!toggleUpldSec);
  }
  return (
    <>
      <div className="bottom-nav">
        <span>
          <BiHomeAlt2 />
        </span>
        <span>
          <BiSearchAlt />
        </span>
        <span onClick={(e) => setToggleUpldSec(!toggleUpldSec)}>
          <BiPlus />
        </span>
      </div>
      {toggleUpldSec && <UploadSec toggleUpldSec={toggleUpldSecFunc} />}
    </>
  );
};

export default BottomNav;
