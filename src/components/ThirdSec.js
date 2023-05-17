import "../styles/homesec.css";
import { BiSearchAlt } from "react-icons/bi";

const ThirdSec = () => {
  return (
    <div className="third-sec">
      <div className="ts-top">
        <input type="search" placeholder="search" />
        <span>
          <BiSearchAlt />
        </span>
      </div>
      <div className="ts-center"></div>
      <div className="ts-bottom"></div>
    </div>
  );
};

export default ThirdSec;
