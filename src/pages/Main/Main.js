import React from "react";

import PlaceMap from "../../components/PlaceMap";
import PlaceInfo from "../../components/PlaceInfo";

import "./Main.css";

function Main() {
  return (
    <div className="main">
      <PlaceMap />
      <PlaceInfo />
    </div>
  );
}

export default Main;