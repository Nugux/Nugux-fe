const duplicateNames = ['중구', '서구', '남구', '동구', '북구', '강서구', '고성군'];
const __STATE_KEY = 'CTP_KOR_NM';
const __CITY_KEY = 'SIG_KOR_NM';
const convGeoJsonArrayToDict = (json, key) => {
    return Object.assign(...json.features.map(e=>{
        return {[e.properties[key]]:e}
    }))
};
export const isDuplicate = (city) => {
    return duplicateNames.includes(city)
};
const duplicatedCityConv = (json, city_key, state_key) => {
    let ret = {};
    json.features.forEach((feature)=>{
        if(isDuplicate(feature.properties[city_key])) {
            if(!ret[feature.properties[state_key]]) {
                ret[feature.properties[state_key]] = {}
            }
            ret[feature.properties[state_key]][feature.properties[city_key]] = feature
        }
    });
    return ret;
};

export const geojson = {
    state: convGeoJsonArrayToDict(require('./geojson/TL_SCCO_CTPRVN'), __STATE_KEY),
    city: convGeoJsonArrayToDict(require('./geojson/TL_SCCO_SIG'), __CITY_KEY),
    city_duplicated: duplicatedCityConv(require('./geojson/TL_SCCO_SIG'), __CITY_KEY, __STATE_KEY)
};
