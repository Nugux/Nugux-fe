const convGeoJsonArrayToDict = (json, key) => {
    return Object.assign(...json.features.map(e=>{
        return {[e.properties[key]]:e}
    }))
};

const __STATE_KEY = 'CTP_KOR_NM';
const __CITY_KEY = 'SIG_KOR_NM';

export const geojson = {
    state: convGeoJsonArrayToDict(require('./geojson/TL_SCCO_CTPRVN'), __STATE_KEY),
    city: convGeoJsonArrayToDict(require('./geojson/TL_SCCO_SIG'), __CITY_KEY),
};
