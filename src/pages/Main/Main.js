import React, {useState} from "react";

import PlaceMap from "../../components/PlaceMap";
import PlaceInfo from "../../components/PlaceInfo";

import "./Main.css";

function Main() {
  const [showPlaceInfo, setShowPlaceInfo] = useState(true);
  const drawPlaceInfo = () => {
      if(showPlaceInfo) {
          return (<PlaceInfo onClose={()=>{
              setShowPlaceInfo(false);
          }}/>)
      }
  };
  return (
    <div className="main">
      <PlaceMap />
      {drawPlaceInfo()}
    </div>
  );
}

export default Main;