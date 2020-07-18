import React from "react";

import { images } from "res/images";
import { usePlaceInfo } from "../../contexts/place-info-context";
import { useMapLocation } from "../../contexts/place-map-context";
import { getTouristSpotDetail } from "../../api/api";

import "./Marker.scss";

const getImage = (level, congestion) => {
    const dict = (level !== 'SPOT')? images.lens:images.marker;
    if (congestion < 2.0) {
        return dict.green;
    } else if (congestion < 3.5) {
        return dict.yellow;
    }
    return dict.red;
};

const Marker = ({ congestion, title, id , lat, long, level }) => {
    const [, placeInfoDispatch] = usePlaceInfo();
    const [, mapLocationDispatch] = useMapLocation();
    const handleClick = async () => {
        if (level === 'SPOT') {
            const result = await getTouristSpotDetail(id);
            placeInfoDispatch({
                type: "fetch",
                payload: {
                    id,
                    placeInfo: result,
                }
            });
        } else {
            const zoomLevel = (level === 'STATE') ? 11 : 15;
            mapLocationDispatch({ type: 'location', location: { lat: lat, lng: long }, zoomLevel: zoomLevel})
        }
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