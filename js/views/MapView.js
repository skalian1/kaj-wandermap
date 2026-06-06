// js/views/MapView.js
// REQUIREMENT: External map integration & advanced API usage

import { StorageService } from '../services/StorageService.js';

export const MapView = {
    map: null,
    // Layer group to keep track of all active markers on the map
    markersGroup: null, 

    init: function() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        mapContainer.innerHTML = '';

        // Initialize Leaflet map
        this.map = L.map('map-container').setView([49.8, 15.4], 4);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Initialize the layer group and add it to the map
        this.markersGroup = L.layerGroup().addTo(this.map);

        // Render pins immediately on startup
        this.renderPins();
    },

    /**
     * Fetches trips and renders markers on the map for trips with valid coordinates.
     */
    renderPins: function() {
        if (!this.map || !this.markersGroup) return;

        // Clear existing markers first to prevent duplication when a new trip is saved
        this.markersGroup.clearLayers();

        const trips = StorageService.getAllTrips();

        trips.forEach(trip => {
            // Check if the trip has valid coordinates using our OOP structural data
            if (trip.coords && trip.coords.lat && trip.coords.lng) {
                // Create a standard Leaflet marker
                const marker = L.marker([trip.coords.lat, trip.coords.lng]);
                
                // Bind a clickable popup window with trip information and a link to details
                // Using our prototype method getFormattedDate()
                marker.bindPopup(`
                    <div class="map-popup">
                        <strong>${trip.title}</strong><br>
                        <small>${trip.getFormattedDate()}</small><br>
                        <a href="#detail-${trip.id}">View details</a>
                    </div>
                `);
                // Add the marker to our managed group
                this.markersGroup.addLayer(marker);
            }
        });
    }
};