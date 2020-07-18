import React from "react";
import {images} from "res/images";

import "./Marker.scss";
import {usePlaceInfo} from "../../contexts/place-info-context";

const getImage = congestion => {
    if (congestion < 2.0) {
        return images.green;
    } else if (congestion < 3.5) {
        return images.yellow;
    }
    return images.red;
};

const Marker = ({congestion, title, id}) => {
    const [_, placeInfoDispatch] = usePlaceInfo();
    const handleClick = () => {
        if(id) {
            placeInfoDispatch({type: 'set', payload: id})
        }
    };


    let label = title;
    if (label.length > 8) {
        label = `${label.substr(0, 7)}...`
    }

    return (
        <div className={'marker-container'} onClick={handleClick}>
            <img src={getImage(congestion)}
                 className={'marker-img'}
                 alt={title}
            />
            <span className={'marker-label'}>{label}</span>
        </div>
    )
};

export const createMarker = (mapObj) => {
    const getTitle = (mapObj) => {
        if (mapObj.name) {
            return mapObj.name
        } else if (mapObj.city) {
            return mapObj.city
        } else {
            return mapObj.state
        }
    };
    return (
        <Marker
            key={`${mapObj.state}${mapObj.city}${mapObj.name}`}
            title={getTitle(mapObj)}
            lat={mapObj.lat}
            lng={mapObj.long}
            {...mapObj}
        />
    )
};