if ("geolocation" in navigator) {
    console.info('geolocation found');
} else {
    console.info('geolocation is not found')
}

let urlField = document.querySelector('#serverUrl');
let refreshRateField = document.querySelector('#refreshRateI');

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
            await fetch(urlEndpoint, fetchOptions);
        }
        catch (err) {
            console.error(`POST ${urlEndpoint}`)
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

            pushData(serviceUrl, position.coords);
        });

    });

