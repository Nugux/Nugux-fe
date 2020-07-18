import React, {useEffect} from "react";

import { useMapLocation } from "../../contexts/place-map-context";

import "./AreaMarker.scss";
import {geojson} from "res/geojson";

const __STATE_KEY = 'CTP_KOR_NM';
const __CITY_KEY = 'SIG_KOR_NM';

const __styleDrawerTable = {};
const __onClickCallbackTable = {};
const __defaultStyle = {
    fillColor: 'green',
    strokeWeight: 2
};
const setStyleDrawer = (name, value) => {
    __styleDrawerTable[name] = value
};

const setCallback = (name, value) => {
    __onClickCallbackTable[name] = value
};

export const commonStyleDrawer = (feature) => {
    const key = feature.getProperty(__STATE_KEY) || feature.getProperty(__CITY_KEY);
    if(__styleDrawerTable[key]) {
        return __styleDrawerTable[key]();
    } else {
        return __defaultStyle;
    }
};

export const commonOnClickCallback = (evt) => {
    const {feature} = evt;
    const key = feature.getProperty(__STATE_KEY) || feature.getProperty(__CITY_KEY);
    if(__onClickCallbackTable[key]) {
        return __onClickCallbackTable[key]();
    } else {
        console.log('on click listener not set')
    }
};

export const AreaMarker = ({ api, congestion, title, lat, long, level }) => {
    const [, mapLocationDispatch] = useMapLocation();
    const handleClick = async () => {
        const zoomLevel = (level === 'STATE') ? 11 : 15;
        mapLocationDispatch({type: 'location', location: {lat: lat, lng: long}, zoomLevel: zoomLevel})
    };

    const json = (level === 'STATE')?geojson.state:geojson.city;

    let features = null;

    setStyleDrawer(title, () => {
        let color = '';
        if (congestion < 2.0) {
            color = 'green';
        } else if (congestion < 3.5) {
            color = 'yellow';
        } else {
            color = 'red';
        }
        return {
            fillColor: color,
            strokeWeight: 2,
        }
    });

    const constructBoundary = () => {
        features = api.data.addGeoJson(json[title], {
            idPropertyName:title
        })
    };

    const destructBoundary = () => {
        api.data.forEach((feature)=> {
            const key = feature.getProperty(__STATE_KEY) || feature.getProperty(__CITY_KEY);
            if(key === title) {
                api.data.remove(feature);
            }
        })
    };

    useEffect(()=>{
        constructBoundary();
        return () => {
            destructBoundary()
        }
    }, []);

    let label = title;
    if (label.length > 8) {
        label = `${label.substr(0, 7)}...`
    }

    return (
        <div
            key={`dummy`}
        />
    )
};