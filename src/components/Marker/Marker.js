import React from "react";
import {images} from "res/images";

import "./Marker.scss";

const Marker = (props) => {
    const getImage = (congestion) => {
        if(congestion < 2.0) {
            return images.green
        } else if(congestion < 3.5) {
            return images.yellow
        } else {
            return images.red
        }
    };
    return (<div
        className={'marker-container'}
    >
        <img src={getImage(props.congestion)}
             className={'marker-img'}
        />
        <span className={'marker-label'}>{props.title}</span>
    </div>)
};

export const createMarker = (mapObj) => {
    return (<Marker
        key={`${mapObj.state}${mapObj.city}`}
        title={mapObj.city?mapObj.city:mapObj.state}
        lat={mapObj.lat}
        lng={mapObj.long}
        {...mapObj}
    />)
};