if ("geolocation" in navigator) {
    console.info('geolocation found');
} else {
    console.info('geolocation is not found')
}
let urlField = document.querySelector('#serverUrl');
let refreshRateField = document.querySelector('#refreshRateI');
let iframe = document.getElementById('mapsIframe');
let apiKeyFld = document.querySelector('#apiKey');

const getMapsSource = (latitude, longitude, apiKey) => `https://www.google.com/maps/embed/v1/place?q=%20${latitude}%2C${longitude}&key=${apiKey}`;

const flattenObj = (object) => {
    if (object) {
        let flatObject = {};
        for (pName in object) {
            flatObject[pName] = object[pName];
        };
        return flatObject;
    }
    return null;
}

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
                    alert(`error: ${err}`);
                })
            if (!resp?.ok) {
                const err = `Status Code ${resp.status}: ${resp.statusText}`;
                console.err(err);
                alert(err);
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


const startBtn = document.querySelector('#form > div:nth-child(2) > div > button:nth-child(2)')
    .addEventListener("click", () => {

        let serviceUrl = urlField.value;
        let refreshRate = refreshRateField.value;

        navigator.geolocation.getCurrentPosition((position) => {
            console.info('received position.coords', position);
            console.info(`posting to ${serviceUrl}`);

            alert(`your gps position is ${position.coords.longitude},${position.coords.latitude}`);

            iframe.src = getMapsSource(position.coords.latitude, position.coords.longitude, apiKeyFld.value);

            pushData(serviceUrl, position.coords);
        });

    });

