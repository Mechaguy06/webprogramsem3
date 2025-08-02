// data-display.js

/**
 * Updates the content of the info panel with location data.
 * @param {string} name - The name of the place.
 * @param {string} address - The formatted address.
 * @param {string} osmId - The OpenStreetMap ID.
 * @param {number} lat - The latitude.
 * @param {number} lng - The longitude.
 */
function updateInfoPanel(name, address, osmId, lat, lng) {
    document.getElementById("latitude").textContent = lat.toFixed(6);
    document.getElementById("longitude").textContent = lng.toFixed(6);
    document.getElementById("address").textContent = address;
    document.getElementById("place-name").textContent = name;
    document.getElementById("osm-id").textContent = osmId;
}

/**
 * Resets the info panel to a "Searching..." state.
 * @param {number} lat - The latitude to display immediately.
 * @param {number} lng - The longitude to display immediately.
 */
function resetInfoPanel(lat, lng) {
    document.getElementById("latitude").textContent = lat.toFixed(6);
    document.getElementById("longitude").textContent = lng.toFixed(6);
    document.getElementById("address").textContent = "Searching...";
    document.getElementById("place-name").textContent = "Searching...";
    document.getElementById("osm-id").textContent = "Searching...";
}   