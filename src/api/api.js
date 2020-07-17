const prefix = '/api/v1/';
const urls = {
    getTouristSpotInfo: 'tourist-spot',
    getDailyCongestion: 'daily-congestion',

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
    const params = {
        date: date,
        northEastLat: northEast.lat,
        northEastLong: northEast.lng,
        southWestLat: southWest.lat,
        southWestLong: southWest.lng,
        spotLevel: convSpotLevel(spotLevel)
    };
    fetch(`${prefix}${urls.getDailyCongestion}?${zipQueryString(params)}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }).then(res => {
            if (res.status !== 200) {
                callback({
                    result: null, error: {
                        status: res.status
                    }
                })
            } else {
                callback({result: res.json(), error: null})
            }
        },
        err => {
            callback({result: null, error: err})
        })
};