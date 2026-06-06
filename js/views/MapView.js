/**
 * @fileoverview View controller for rendering the interactive map using Leaflet.js.
 * Satisfies KAJ requirement: External map integration & advanced API usage.
 */

import { StorageService } from '../services/StorageService.js';

/**
 * View module responsible for map initialization, tile rendering, and plotting markers.
 * @namespace
 */
export const MapView = {
    /**
     * Holds the active Leaflet map instance.
     * @type {Object|null}
     */
    map: null,

    /**
     * Layer group to efficiently track and manage all active markers on the map.
     * @type {Object|null}
     */
    markersGroup: null, 

    /**
     * Initializes the map container, sets the default geographical view,
     * loads the OpenStreetMap tile layer, and performs the initial pin render.
     */
    init: function() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) return;

        mapContainer.innerHTML = '';

        this.map = L.map('map-container').setView([49.8, 15.4], 4);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.markersGroup = L.layerGroup().addTo(this.map);

        this.renderPins();
    },

    /**
     * Fetches trip data from storage and dynamically renders map markers
     * for entities containing valid geographical coordinates.
     */
    renderPins: function() {
        if (!this.map || !this.markersGroup) return;

        // Clear existing markers to prevent visual duplication on UI re-renders
        this.markersGroup.clearLayers();

        const trips = StorageService.getAllTrips();

        trips.forEach(trip => {
            if (trip.coords && trip.coords.lat && trip.coords.lng) {
                const marker = L.marker([trip.coords.lat, trip.coords.lng]);
                
                marker.bindPopup(`
                    <div class="map-popup">
                        <strong>${trip.title}</strong><br>
                        <small>${trip.getFormattedDate()}</small><br>
                        <a href="#detail-${trip.id}">View details</a>
                    </div>
                `);
                
                this.markersGroup.addLayer(marker);
            }
        });
    }
};