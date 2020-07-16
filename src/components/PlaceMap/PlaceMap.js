import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Button } from "antd";

import MapHeader from "./MapHeader";
import { useSidebar } from "../../contexts/sidebar-context";

import "./PlaceMaps.scss";

const defaultCenter = [37.5647689, 126.7093638];

// TODO: 지도 확대/축소 버튼 추가하기
function PlaceMap() {
  const [location, setLocation] = useState(defaultCenter);
  const [bounds, setBounds] = useState({ne: {lat:0, lng:0}, sw: {lat:0, lng:0}});
  const [zoomLevel, setZoomLevel] = useState(12);
  const [api, setApi] = useState(null);
  const [, SidebarDispatch] = useSidebar();

  const calcBounds = () => {
    if(api) {
      const bound = api.getBounds();
      const [sw, ne] = [bound.getNorthEast(), bound.getSouthWest()];
      setBounds({
        sw: {
          lat:sw.lat(),
          lng:sw.lng()
        },
        ne: {
          lat:ne.lat(),
          lng:ne.lng()
        },
      })
    }
  };
  const handleDragEnd = ({ center }) => {
    setLocation([center.lat(), center.lng()]);
    calcBounds()
  };

  const handleSelectDate = (date) => {
    console.log(`${date}[zoom: ${zoomLevel}]: `, location);

    // TODO: date, zoomLevel, location 정보로 리스트 요청
  };

  const handleZoom = zoom => {
    // TODO: 특정 레벨 이하로 가는거 막기
    if (zoom < 7) {
      return;
    }
    setZoomLevel(zoom);
    calcBounds();
  };

  return (
    <div className="place-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        defaultCenter={defaultCenter}
        yesIWantToUseGoogleMapApiInternals
        zoom={zoomLevel}
        onDragEnd={handleDragEnd}
        onZoomAnimationEnd={handleZoom}
        onGoogleApiLoaded={({map})=>{setApi(map)}}
      />
      <MapHeader handleSelectDate={handleSelectDate} />
      <Button className="place-list-btn" onClick={() => SidebarDispatch({ type: "open" })}>
        주변 관광지 보기
      </Button>
    </div>
  );
}

export default PlaceMap;