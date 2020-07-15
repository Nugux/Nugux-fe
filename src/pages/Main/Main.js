import React from "react";

import MyMap from "../../components/MyMap";
import PlaceInfo from "../../components/PlaceInfo";
import MapHeader from "../../components/MapHeader";

import "./Main.css";

function Main() {
  return (
    <div className="main">
      <MyMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        isMarkerShown={false}
      />
      <MapHeader />
      <PlaceInfo />
    </div>
  );
}

export default Main;