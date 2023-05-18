import { useState } from "react";
import "../App.css";
import UploadSec from "./UploadSec";
import { BiHomeAlt2, BiSearchAlt, BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

const BottomNav = () => {
  const [toggleUpldSec, setToggleUpldSec] = useState(false);
  const linkStyle = { color: "black" };
  function toggleUpldSecFunc() {
    setToggleUpldSec(!toggleUpldSec);
  }
  return (
    <>
      <div className="bottom-nav">
        <span>
          <Link to={"/"} style={linkStyle}>
            <BiHomeAlt2 />
          </Link>
        </span>
        <span>
          <Link to={"/thirdsec"} style={linkStyle}>
            {" "}
            <BiSearchAlt />
          </Link>
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
