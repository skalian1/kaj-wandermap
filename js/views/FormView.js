// js/views/FormView.js

import { WanderMap } from '../models/Trip.js';
import { StorageService } from '../services/StorageService.js';
import { DashboardView } from './DashboardView.js';
import { Router } from '../services/Router.js';
import { MapView } from './MapView.js';

export const FormView = {
    init: function() {
        const form = document.getElementById('new-trip-form');
        if (!form) return;

        // --- Geolocation Logic ---
        const btnLocation = document.getElementById('btn-get-location');
        if (btnLocation) {
            btnLocation.addEventListener('click', () => {
                // Check if browser supports Geolocation API
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser.');
                    return;
                }

                // Provide visual feedback while loading
                const originalText = btnLocation.innerText;
                btnLocation.innerText = 'Locating...';
                btnLocation.disabled = true;

                // Call the Geolocation API
                navigator.geolocation.getCurrentPosition(
                    // Success callback
                    (position) => {
                        // Store coordinates in hidden input fields
                        document.getElementById('trip-lat').value = position.coords.latitude;
                        document.getElementById('trip-lng').value = position.coords.longitude;
                        
                        // Update UI to show success
                        btnLocation.innerText = 'Location Acquired!';
                        btnLocation.style.backgroundColor = '#27ae60'; // Green confirmation
                    },
                    // Error callback
                    (error) => {
                        console.error('Error obtaining location:', error);
                        alert('Unable to retrieve your location. Check your browser permissions.');
                        
                        // Revert button state
                        btnLocation.innerText = originalText;
                        btnLocation.disabled = false;
                    }
                );
            });
        }

        // Listen for the form submission event
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.getElementById('trip-title').value;
            const date = document.getElementById('trip-date').value;
            const notes = document.getElementById('trip-notes').value;
            const lat = document.getElementById('trip-lat').value || null;
            const lng = document.getElementById('trip-lng').value || null;

            const newTrip = new WanderMap.Models.Trip(title, date, notes, lat, lng);
            StorageService.saveTrip(newTrip);

            form.reset();

            if (btnLocation) {
                btnLocation.innerText = 'Get My Location';
                btnLocation.style.backgroundColor = '';
                btnLocation.disabled = false;
            }

            document.getElementById('trip-title').focus();
            
            // Update the dashboard list immediately after saving
            DashboardView.render();

            // Update map pins immediately after saving a new trip
            MapView.renderPins();

            alert('Trip successfully saved!');
            Router.navigate('');
        });
    }
};