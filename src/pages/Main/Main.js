import React, {useState} from "react";

import PlaceMap from "../../components/PlaceMap";
import PlaceInfo from "../../components/PlaceInfo";

import "./Main.css";

function Main() {
  const [showPlaceInfo, setShowPlaceInfo] = useState(true);

  return (
    <div className="main">
      <PlaceMap />
      {showPlaceInfo && (
        <PlaceInfo onClose={() => { setShowPlaceInfo(false); }}/>
      )}
    </div>
  );
}

export default Main;