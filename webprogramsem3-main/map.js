// map.js

let map;
let marker;

/**
 * Initializes the Leaflet map and sets up event listeners.
 */
function initMap() {
    // Initialize the map centered on Kuala Lumpur
    map = L.map('map').setView([3.14667, 101.6962], 15); // Lat, Lng, Zoom

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a click listener to the map
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Clear existing marker
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a new marker at the clicked location
        marker = L.marker([lat, lng]).addTo(map);

        // Reset info panel and show immediate coordinates
        resetInfoPanel(lat, lng);

        // Open a popup at the marker with initial info
        marker.bindPopup(`
            <b>Coordinates:</b><br>
            Lat: ${lat.toFixed(6)}<br>
            Lng: ${lng.toFixed(6)}<br>
            Searching for address...
        `).openPopup();

        // Perform reverse geocoding using Nominatim
        reverseGeocode(lat, lng);
    });
}

/**
 * Performs reverse geocoding for the given coordinates using Nominatim.
 * @param {number} lat - The latitude.
 * @param {number} lng - The longitude.
 */
async function reverseGeocode(lat, lng) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    try {
        const response = await fetch(nominatimUrl, {
            headers: {
                'User-Agent': 'YourWebApp/1.0 (your-email@example.com)' // Replace with your actual app name and email
            }
        });
        const data = await response.json();

        if (data && data.display_name) {
            const address = data.display_name;
            const placeName = data.name || data.address.road || data.address.building || "Unnamed Place";
            const osmId = data.osm_id || 'N/A';

            // Use the function from data-display.js
            updateInfoPanel(placeName, address, osmId, lat, lng);

            marker.setPopupContent(`
                <b>${placeName}</b><br>
                ${address}<br>
                Lat: ${lat.toFixed(6)}<br>
                Lng: ${lng.toFixed(6)}
            `).openPopup();

        } else {
            updateInfoPanel("N/A", "Address not found.", "N/A", lat, lng);
            marker.setPopupContent(`
                <b>Coordinates:</b><br>
                Lat: ${lat.toFixed(6)}<br>
                Lng: ${lng.toFixed(6)}<br>
                Address not found.
            `).openPopup();
        }
    } catch (error) {
        console.error("Error during reverse geocoding:", error);
        updateInfoPanel("Error", "Error retrieving address.", "Error", lat, lng);
        marker.setPopupContent(`
            <b>Coordinates:</b><br>
            Lat: ${lat.toFixed(6)}<br>
            Lng: ${lng.toFixed(6)}<br>
            Error retrieving address.
        `).openPopup();
    }
}

// Initialize the map when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initMap);