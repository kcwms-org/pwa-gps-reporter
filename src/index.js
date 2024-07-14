const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/embed';

if ("geolocation" in navigator) {
    console.info('geolocation found');
} else {
    console.info('geolocation is not found');
}
let urlField = document.getElementById('serverUrl');
let iframe = document.getElementById('mapsIframe');

let uniqueIdFld = document.getElementById('senderName');
let statusSpan = document.getElementById('status');

let geolocationHandlerID = 0;
/**
 * @typedef {GeolocationCoordinates} cachedCoordinates
 */
let cachedCoordinates = null;

/**
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns 
 */
const getMapsSource = (latitude, longitude) => `${GOOGLE_MAPS_BASE_URL}/v1/place?q=%20${latitude}%2C${longitude}&key=${GOOGLE_SHEETS_API_KEY}`;


/**
 * since JSON.stringify() will ignore non-OwnProperties, 
 *  return a new object with all the properties of the input objects * 
 * @param {object} inputObj 
 * @returns 
 */
const flattenObj = (inputObj) => {
    let flatObject = {};
    if (inputObj) {
        for (pName in inputObj) {
            if (typeof inputObj[pName] != 'function') {
                flatObject[pName] = inputObj[pName];
            }
        };
    }
    return flatObject;
}

/**
 * push the GPS coordinates to the remote server
 * @param {string} urlEndpoint 
 * @param {string} uniqueId
 * @param {GeolocationCoordinates} geoLocationCoords 
 */
const pushData = async (urlEndpoint, uniqueId, geoLocationCoords) => {
    if (geoLocationCoords?.latitude && geoLocationCoords.longitude) {

        const coordinateString = `${geoLocationCoords.latitude},${geoLocationCoords.longitude}`;
        const coordinateStringEncoded = encodeURIComponent(coordinateString);

        const formData = new FormData();
        formData.append('name', uniqueId);
        formData.append('coordinates', coordinateString);
        formData.append('url', `${BASE_GOOGLE_MAPS_URL}/${coordinateStringEncoded}`)

        const fetchOptions = {
            body: formData,
            method: 'POST'
        };

        try {
            const resp = await fetch(urlEndpoint, fetchOptions)
                .catch((err) => {
                    console.error(`fetch(${urlEndpoint})`, err);
                });

            if (resp?.ok) {
                console.info(`fetch(${urlEndpoint})`, resp);
            }
        }
        catch (err) {
            const errMsg = `POST ${urlEndpoint} failed with ${err}`;
            console.error(errMsg);

            alert(errMsg);
        }

    }
    else {
        const err = `${geoLocationCoords ?? { latitude: null, longitude: null }} is invlaid`;
        console.error(err);
        alert(err);
    }
}

/**
 * 
 * @param {GeolocationCoordinates} geoLocationCoords 
 * @param {number} minimumDistance
 * @returns {true|false}
 */
const shouldPushData = (geoLocationCoords, minimumDistance) => {
    let hasLocationChanged = true;
    if (!minimumDistance) {
        minimumDistance = .01; //.01 mile = about 50 feet
    }

    // if we have not loaded the maps into the frame yet, we need to load it
    if ((iframe.src || '').toString().startsWith(GOOGLE_MAPS_BASE_URL) == false) {
        hasLocationChanged = true;
    } else {
        if (geoLocationCoords) {
            hasLocationChanged =
                (geoLocationCoords.latitude !== cachedCoordinates.latitude
                    || geoLocationCoords.longitude !== cachedCoordinates.longitude);

            if (hasLocationChanged) {
                // is the distance changed >= minimumDistance
                const distancedDiff = haversine_distance(cachedCoordinates, geoLocationCoords, "miles");
                hasLocationChanged = distancedDiff >= minimumDistance;
            }
        }
    }
    return hasLocationChanged;
}

/**
 * start collecting GPS data and publish it to the server
 */
document.querySelector('#startBtn')
    .addEventListener("click", () => {

        statusSpan.innerHTML = 'Tracking Location...'
        //request that the device notify us everytime the GPS coordinates change
        geolocationHandlerID = navigator.geolocation.watchPosition((position) => {

            //log the data so for debugging purposes
            console.info('received position.coords', position);
            
            //load the google map if coords have changed
            
            if (shouldPushData(position.coords)) {
                iframe.src = getMapsSource(position.coords.latitude, position.coords.longitude);
                //push data to server
                pushData(urlField.value, uniqueIdFld.value, position.coords);
            }
            
            cachedCoordinates = position.coords;


        });

    });
/**
 * stop collection gps data
 */
document.querySelector('#stopBtn')
    .addEventListener('click', () => {
        navigator.geolocation.clearWatch(geolocationHandlerID);
        statusSpan.innerHTML = "Stopped";
        setTimeout(() => {
            if (statusSpan?.innerHTML === "Stopped") {
                statusSpan.innerHTML = "Waiting..."
            }
        }, 2000);
    });

