import React from "react";
import {images} from "res/images";

import "./Marker.scss";
import {usePlaceInfo} from "../../contexts/place-info-context";
import {useMapLocation} from "../../contexts/place-map-context";

const getImage = congestion => {
    if (congestion < 2.0) {
        return images.green;
    } else if (congestion < 3.5) {
        return images.yellow;
    }
    return images.red;
};

const Marker = ({congestion, title, id, lat, long, level}) => {
    const [_, placeInfoDispatch] = usePlaceInfo();
    const [__, mapLocationDispatch] = useMapLocation();
    const handleClick = () => {
        if(level === 'SPOT') {
            placeInfoDispatch({type: 'set', payload: id})
        } else {
            const zoomLevel = (level === 'STATE')?11:15;
            mapLocationDispatch({type: 'location', location:{lat:lat, lng:long}, zoomLevel: zoomLevel})
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
    const spotLevel = (mapObj) => {
        if (mapObj.name) {
            return 'SPOT'
        } else if (mapObj.city) {
            return 'CITY'
        } else {
            return 'STATE'
        }
    };
    const getTitle = (mapObj, spotLevel) => {
        switch (spotLevel) {
            case 'SPOT':
                return mapObj.name;
            case 'CITY':
                return mapObj.city;
            case 'STATE':
                return mapObj.state;
        }
    };
    return (
        <Marker
            key={`${mapObj.state}${mapObj.city}${mapObj.name}`}
            level={spotLevel(mapObj)}
            title={getTitle(mapObj, spotLevel(mapObj))}
            lat={mapObj.lat}
            lng={mapObj.long}
            {...mapObj}
        />
    )
};