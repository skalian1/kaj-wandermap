// js/views/MapView.js
// REQUIREMENT: External map integration

export const MapView = {
    // Variable to hold the Leaflet map instance
    map: null,

    init: function() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        // 1. Clear our HTML placeholder text
        mapContainer.innerHTML = '';

        // 2. Initialize the map
        // L.map() is a Leaflet function. We pass the ID of our container.
        // setView([latitude, longitude], zoom_level)
        // Center coordinates point approximately to Central Europe
        this.map = L.map('map-container').setView([49.8, 15.4], 4);

        // 3. Add the tile layer (the actual map images)
        // We use OpenStreetMap tiles. This is required, otherwise the map is just a gray box.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        console.log("Leaflet map successfully initialized.");
    }
};