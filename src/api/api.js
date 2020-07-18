const prefix = '/api/v1/';
const urls = {
    getTouristSpotInfo: 'tourist-spot',
    getDailyCongestion: 'daily-congestion',
    getTouristSpotDetail: (id)=>`tourist-spot/${id}/detail`,

};

const zipQueryString = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
};

const convSpotLevel = (level) => {
    if (level < 11) {
        return 'STATE'
    } else if (level < 15) {
        return 'CITY'
    } else {
        return 'SPOT'
    }
};
export const getDailyCongestion = (date, northEast, southWest, spotLevel, callback) => {
    const translated = convSpotLevel(spotLevel);
    if (translated === 'SPOT') {
        getTouristSpotInfo(date, northEast, southWest, callback)
    } else {
        getDailyCongestionOfCity(date, northEast, southWest, translated, callback)
    }
};
const onSuccessAction = (callback) => {
    return res => {
        if (res.status !== 200) {
            callback({
                result: null, error: {
                    status: res.status
                }
            })
        } else {
            callback({result: res.json(), error: null})
        }
    }
};
const onErrorAction = (callback) => {
    return err => {
        callback({result: null, error: err})
    }
};

const sharedOpt = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
};

const getDailyCongestionOfCity = (date, northEast, southWest, spotLevel, callback) => {
    const params = {
        date: date,
        northEastLat: northEast.lat,
        northEastLong: northEast.lng,
        southWestLat: southWest.lat,
        southWestLong: southWest.lng,
        spotLevel: spotLevel
    };
    fetch(`${process.env.REACT_APP_SERVER}${prefix}${urls.getDailyCongestion}?${zipQueryString(params)}`, sharedOpt)
        .then(onSuccessAction(callback),
            onErrorAction(callback))
};
const getTouristSpotInfo = (date, northEast, southWest, callback) => {
    const params = {
        date: date,
        northEastLat: northEast.lat,
        northEastLong: northEast.lng,
        southWestLat: southWest.lat,
        southWestLong: southWest.lng,
    };
    fetch(`${process.env.REACT_APP_SERVER}${prefix}${urls.getTouristSpotInfo}?${zipQueryString(params)}`, sharedOpt)
        .then(onSuccessAction(callback),
            onErrorAction(callback))
};

export const getTouristSpotDetail = id => {
    const params = {
        id: id,
    };
    return fetch(`${process.env.REACT_APP_SERVER}${prefix}${urls.getTouristSpotDetail(id)}?${zipQueryString(params)}`, sharedOpt)
        .then(
          res => {
            if (res.status !== 200) {
                return null;
            }
            return res.json();
          },
          error => {
            console.log(error);
            return null;
          }
        );
};