if ("geolocation" in navigator) {
    console.info('geolocation found');
} else {
    console.info('geolocation is not found')
}
let urlField = document.getElementById('serverUrl');
let iframe = document.getElementById('mapsIframe');
let apiKeyFld = document.getElementById('apiKey');

let geolocationHandlerID = 0;

/**
 * 
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {string} apiKey 
 * @returns 
 */
const getMapsSource = (latitude, longitude, apiKey) => `https://www.google.com/maps/embed/v1/place?q=%20${latitude}%2C${longitude}&key=${apiKey}`;


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
 * @param {GeolocationCoordinates} geoLocationCoords 
 */
const pushData = async (urlEndpoint, geoLocationCoords) => {
    if (geoLocationCoords?.latitude && geoLocationCoords.longitude) {

        const payload = flattenObj(geoLocationCoords);
        const jsonPayload = JSON.stringify(payload);

        const fetchOptions = {
            body: jsonPayload,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
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

        //get the latest service url: not likely but it may have changed
        let serviceUrl = urlField.value;

        //request that the device notify us everytime the GPS coordinates change
        geolocationHandlerID = navigator.geolocation.watchPosition((position) => {

            //log the data so for debugging purposes
            console.info('received position.coords', position);

            //load the google map
            iframe.src = getMapsSource(position.coords.latitude, position.coords.longitude, apiKeyFld.value);

            //push data to server
            pushData(serviceUrl, position.coords);

        });

    });
/**
 * stop collection gps data
 */
document.querySelector('#stopBtn')
    .addEventListener('click', () => {
        navigator.geolocation.clearWatch(geolocationHandlerID);
    });

