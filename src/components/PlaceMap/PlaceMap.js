import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import { Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import MapHeader from "./MapHeader";
import { useSidebar } from "../../contexts/sidebar-context";
import { usePlaceList } from "../../contexts/place-list-context";
import { usePlaceInfo } from "../../contexts/place-info-context";

import "./PlaceMaps.scss";
import {getDailyCongestion} from "../../api/api";
import {createMarker} from "../Marker/Marker";
import { defaultCenter, defaultZoom, MapLocationStateContext, useMapLocation } from "../../contexts/place-map-context";
import {geojson} from "res/geojson";
import {commonOnClickCallback, commonStyleDrawer} from "../AreaMarker/AreaMarker";

// TODO: 지도 확대/축소 버튼 추가하기
function PlaceMap() {
  const [mapLocationState, mapLocationDispatch] = useMapLocation();
  const [currentZoomLevel, setCurrentZoomLevel] = useState(defaultZoom);
  const [bounds, setBounds] = useState({ne: {lat:0, lng:0}, sw: {lat:0, lng:0}});
  const [date, setDate] = useState(moment().format("yyyy-MM-DD"));
  const [api, setApi] = useState(null);
  const [, SidebarDispatch] = useSidebar();
  const [, PlaceListDispatch] = usePlaceList();
  const [, PlaceInfoDispatch] = usePlaceInfo();
  const [markers, setMarkers] = useState([]);

  const calcBounds = (api_) => {
    const apiInst = api || api_;
    if(apiInst) {
      const bound = apiInst.getBounds();
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

  const reloadMarkers = (api_) => {
    calcBounds(api_);
    PlaceInfoDispatch({ type: "resetInfo" });
    getDailyCongestion(date, bounds.ne, bounds.sw, currentZoomLevel, ({result, error})=> {
      if(!api)
        return;
      if(error) {
        console.log(error);
      } else {
        result.then(list => {
          const placeList = list.map(mapObj => createMarker(api, mapObj));
          PlaceListDispatch({
            type: "fetch",
            payload: placeList
          });
          setMarkers(placeList);
        });
      }
    })
  };

  const handleDragEnd = ({ center }) => {
    reloadMarkers()
  };

  const handleSelectDate = (date_) => {
    setDate(date_);
    reloadMarkers()
  };

  const handleZoom = zoom => {
    // TODO: 특정 레벨 이하로 가는거 막기
    if (zoom < 7) {
      mapLocationDispatch({ type: 'zoom', zoomLevel: 7 });
      return;
    }
    setCurrentZoomLevel(zoom);
    reloadMarkers();
  };

  const initMapApi = map => {
    setApi(map);
    reloadMarkers(map);
    map.data.addListener('click', commonOnClickCallback);
    map.data.setStyle(commonStyleDrawer);
  };

  return (
    <div className="place-map-container">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        zoom={mapLocationState.zoomLevel}
        center={mapLocationState.location}
        onClick={() => PlaceInfoDispatch({ type: "resetInfo" })}
        onBoundsChange={handleDragEnd}
        onZoomAnimationEnd={handleZoom}
        onTilesLoaded={reloadMarkers}
        onGoogleApiLoaded={({map})=>{initMapApi(map)}}
      >
      {markers}
      </GoogleMapReact>
      <MapHeader handleSelectDate={handleSelectDate} />
      {
        currentZoomLevel >= 15 && (
          <Button
            className="place-list-btn"
            size="large"
            danger
            shape="round"
            onClick={() => SidebarDispatch({ type: "open" })}>
            <UnorderedListOutlined />
            주변 관광지 보기
          </Button>
        )
      }
    </div>
  );
}

export default PlaceMap;