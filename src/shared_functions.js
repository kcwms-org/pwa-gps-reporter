
/**
 * 
 * @param {GeolocationCoordinates} mk1 
 * @param {GeolocationCoordinates} mk2 
 * @param {'miles'|'kilometers'} milesOrKilometers
 * @returns {number}
 * @author 'https://mapsplatform.google.com/resources/blog/how-calculate-distances-map-maps-javascript-api/'
 */
function haversine_distance(mk1, mk2, milesOrKilometers) {
    

    if (!milesOrKilometers) {
        milesOrKilometers = "miles";
    }
    var R = (milesOrKilometers == "miles" ? 3958.8 : 6371.0710); // Radius of the Earth in miles/kilometers
    var rlat1 = mk1.latitude * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.longitude - mk1.longitude) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}