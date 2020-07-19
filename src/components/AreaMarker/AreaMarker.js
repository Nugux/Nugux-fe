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
        if(isDuplicate(title)) {
            json = geojson.city_duplicated;
        } else {
            json = geojson.city;
        }
    }

    let features = null;

    setStyleDrawer(title, () => {
        let color = '';
        let r = 0;
        let g = 0;
        const colorParam = Math.round((congestion/5.0)*600);
        if(colorParam > 255) {
            r = 255
        } else {
            r = colorParam
        }

        if(colorParam > 510) {
            g = 0
        } else {
            g = 255 - (colorParam - 255)
        }

        color = `#${r.toString(16)}${g.toString(16)}00`;

        return {
            fillColor: color,
            strokeWeight: 2,
            clickable: true
        }
    });

    setCallback(title, handleClick);

    const constructBoundary = () => {
        let gj = null;
        if(isDuplicate(title) && json[state] && json[state][title]) {
            gj = json[state][title]
        } else {
            gj = json[title];
        }
        features = api.data.addGeoJson(gj, {
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