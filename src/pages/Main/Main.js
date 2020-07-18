import React from "react";

import PlaceMap from "../../components/PlaceMap";
import PlaceInfo from "../../components/PlaceInfo";

import "./Main.css";
import {usePlaceInfo} from "../../contexts/place-info-context";

function Main() {
  const [showPlaceInfo, _] = usePlaceInfo();

  return (
    <div className="main">
      <PlaceMap />
      {showPlaceInfo.selectedPlaceId && (
        <PlaceInfo/>
      )}
    </div>
  );
}

export default Main;