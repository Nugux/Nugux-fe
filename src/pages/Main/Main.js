import React, {useState} from "react";

import MyMap from "../../components/MyMap";
import PlaceInfo from "../../components/PlaceInfo";
import MapHeader from "../../components/MapHeader";

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
      <MyMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        isMarkerShown={false}
      />
      <MapHeader />
      {drawPlaceInfo()}
    </div>
  );
}

export default Main;