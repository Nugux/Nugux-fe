import React, {useEffect} from "react";

import { useMapLocation } from "../../contexts/place-map-context";

import "./AreaMarker.scss";
import {geojson, isDuplicate} from "res/geojson";

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
    const key = feature.getProperty(__CITY_KEY) || feature.getProperty(__STATE_KEY);
    if(__styleDrawerTable[key]) {
        return __styleDrawerTable[key]();
    } else {
        return __defaultStyle;
    }
};

export const commonOnClickCallback = (evt) => {
    const {feature} = evt;
    const key = feature.getProperty(__CITY_KEY) || feature.getProperty(__STATE_KEY);
    if(__onClickCallbackTable[key]) {
        return __onClickCallbackTable[key]();
    } else {
        console.log('on click listener not set')
    }
};

export const AreaMarker = ({ api, congestion, title, lat, long, level, state}) => {
    const [, mapLocationDispatch] = useMapLocation();
    const handleClick = async () => {
        const zoomLevel = (level === 'STATE') ? 11 : 15;
        mapLocationDispatch({type: 'location', location: {lat: lat, lng: long}, zoomLevel: zoomLevel})
    };

    let json = {};

    if (level === 'STATE') {
        json = geojson.state
    } else{
        if(isDuplicate(title) && geojson.city_duplicated[state]) {
            json = geojson.city_duplicated[state];
        } else {
            json = geojson.city;
        }
    }

    let features = null;

    setStyleDrawer(title, () => {
        const colorParam = Math.max(((congestion-1.5)/3.5), 0);
        const rParam = Math.min(colorParam, 0.5)*2;
        const gParam = 1-Math.max(colorParam-0.5, 0)*2;
        const multiplier = 400; // 색 차이가 좀 더 두드러지도록...
        const r = Math.min(Math.round(rParam * multiplier), 255);
        const g = Math.min(Math.round(gParam * multiplier), 255);
        const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}00`;
        console.log(rParam, gParam, r, g, color);
        return {
            fillColor: color,
            strokeWeight: 2,
            clickable: true
        }
    });

    setCallback(title, handleClick);

    const constructBoundary = () => {
        features = api.data.addGeoJson(json[title], {
            idPropertyName:title
        })
    };

    const destructBoundary = () => {
        api.data.forEach((feature)=> {
            const key = feature.getProperty(__CITY_KEY) || feature.getProperty(__STATE_KEY);
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

    return (
        <div
            key={`dummy`}
        />
    )
};