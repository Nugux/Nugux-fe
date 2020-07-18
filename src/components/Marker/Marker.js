import React from "react";

import {images} from "res/images";
import {usePlaceInfo} from "../../contexts/place-info-context";
import {getTouristSpotDetail} from "../../api/api";

import "./Marker.scss";
import {AreaMarker} from "../AreaMarker/AreaMarker";

const getImage = (level, congestion) => {
    const dict = (level !== 'SPOT')? images.lens:images.marker;
    if (congestion < 2.0) {
        return dict.green;
    } else if (congestion < 3.5) {
        return dict.yellow;
    }
    return dict.red;
};

const Marker = ({ congestion, title, id, level }) => {
    const [, placeInfoDispatch] = usePlaceInfo();
    const handleClick = async () => {
        const result = await getTouristSpotDetail(id);
        placeInfoDispatch({
            type: "fetch",
            payload: {
                id,
                placeInfo: result,
            }
        });
    };

    let label = title;
    if (label.length > 8) {
        label = `${label.substr(0, 7)}...`
    }

    return (
        <div className={'marker-container'} onClick={handleClick}>
            <img src={getImage(level, congestion)}
                 className={`${level!=='SPOT'?'lens':'marker'}`}
                 alt={title}
            />
            <span className={'marker-label'}>{label}</span>
        </div>
    )
};

export const createMarker = (api, mapObj) => {
    let spotLevel = '';
    if (mapObj.name) {
        spotLevel = 'SPOT'
    } else if (mapObj.city) {
        spotLevel = 'CITY'
    } else {
        spotLevel = 'STATE'
    }
    let title = '';
    switch (spotLevel) {
        case 'SPOT':
            title = mapObj.name;
            break;
        case 'CITY':
            title = mapObj.city;
            break;
        case 'STATE':
            title = mapObj.state;
            break;
    }
    return (
        (spotLevel === 'SPOT')?
            (<Marker
            key={`${mapObj.state}${mapObj.city}${mapObj.name}`}
            level={spotLevel}
            title={title}
            lat={mapObj.lat}
            lng={mapObj.long}
            {...mapObj}
        />):
            (<AreaMarker
                key={`${mapObj.state}${mapObj.city}${mapObj.name}`}
                level={spotLevel}
                title={title}
                lat={mapObj.lat}
                lng={mapObj.long}
                api={api}
                {...mapObj}
            />)
    )
};