import React from "react";
import { images } from "res/images";

import "./Marker.scss";

const getImage = congestion => {
    if (congestion < 2.0) {
        return images.green;
    } else if (congestion < 3.5) {
        return images.yellow;
    }
    return images.red;
};

const Marker = ({ congestion, title }) => {
  const handleClick = () => {
    console.log(`${title} is clicked`);
  };

  return (
    <div className={'marker-container'} onClick={handleClick}>
      <img src={getImage(congestion)}
           className={'marker-img'} />
      <span className={'marker-label'}>{title}</span>
    </div>
  )
};

export const createMarker = (mapObj) => {
    return (
      <Marker
        key={`${mapObj.state}${mapObj.city}`}
        title={mapObj.city ? mapObj.city : mapObj.state}
        lat={mapObj.lat}
        lng={mapObj.long}
        {...mapObj}
      />
    )
};