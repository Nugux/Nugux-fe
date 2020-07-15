import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

import MapHeader from "./MapHeader";

import "./PlaceMap.css";

const defaultCenter = [37.5647689, 126.7093638];

// TODO: 지도 확대/축소 버튼 추가하기
function PlaceMap() {
  const [location, setLocation] = useState(defaultCenter);
  const [zoomLevel, setZoomLevel] = useState(12);

  const handleDragEnd = ({ center }) => {
    setLocation([center.lat(), center.lng()]);
  };

  const handleSelectDate = (date) => {
    console.log(`${date}[zoom: ${zoomLevel}]: `, location);

    // TODO: date, zoomLevel, location 정보로 리스트 요청
  };

  const handleZoom = zoom => {
    // TODO: 특정 레벨 이하로 가는거 막기
    if (zoom < 100) {
      return;
    }
    setZoomLevel(zoom);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={defaultCenter}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoomLevel}
        onDragEnd={handleDragEnd}
        onZoomAnimationEnd={handleZoom}
      />
      <MapHeader handleSelectDate={handleSelectDate} />
    </div>
  );
}

export default PlaceMap;