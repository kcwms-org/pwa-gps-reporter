if ("geolocation" in navigator) {
    console.info('geolocation found');
} else {
    console.info('geolocation is not found')
}
let urlField = document.getElementById('serverUrl');
let iframe = document.getElementById('mapsIframe');

let uniqueIdFld = document.getElementById('senderName');
let statusSpan = document.getElementById('status');

let geolocationHandlerID = 0;
let cachedCoordinates = null;

/**
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns 
 */
const getMapsSource = (latitude, longitude) => `https://www.google.com/maps/embed/v1/place?q=%20${latitude}%2C${longitude}&key=${GOOGLE_SHEETS_API_KEY}`;


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
 * start collecting GPS data and publish it to the server
 */
document.querySelector('#startBtn')
    .addEventListener("click", () => {

        statusSpan.innerHTML = 'Tracking Location...'
        //request that the device notify us everytime the GPS coordinates change
        geolocationHandlerID = navigator.geolocation.watchPosition((position) => {

            //log the data so for debugging purposes
            cachedCoordinates = position.coords;
            console.info('received position.coords', position);

            //load the google map if coords have changed

            if ((cachedCoordinates?.latitude != position.coords.latitude || cachedCoordinates?.longitude != position.coords.longitude)
                || (iframe.src || '').toString().startsWith('https://www.google.com/maps/embed') == false) {
                iframe.src = getMapsSource(position.coords.latitude, position.coords.longitude);
            }

            //push data to server
            pushData(urlField.value, uniqueIdFld.value, position.coords);

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

