// js/views/FormView.js

import { WanderMap } from '../models/Trip.js';
import { StorageService } from '../services/StorageService.js';

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
            // CRITICAL: Prevent the default behavior (which is a page reload)
            event.preventDefault();

            // 1. Get values from the input fields
            const title = document.getElementById('trip-title').value;
            const date = document.getElementById('trip-date').value;
            const notes = document.getElementById('trip-notes').value;
            
            // Coordinates will be handled in the next commit, set to null for now
            const lat = document.getElementById('trip-lat').value || null;
            const lng = document.getElementById('trip-lng').value || null;

            // 2. Create a new Trip object using our OOP model
            const newTrip = new WanderMap.Models.Trip(title, date, notes, lat, lng);

            // 3. Save the trip to LocalStorage
            StorageService.saveTrip(newTrip);

            // 4. Reset the form fields for the next entry
            form.reset();

            // 5. Reset the location button to its original state
            if (btnLocation) {
                btnLocation.innerText = 'Get My Location';
                btnLocation.style.backgroundColor = '';
                btnLocation.disabled = false;
            }

            // 6. Return focus to the first input field programmatically
            document.getElementById('trip-title').focus();

            // Temporary user feedback
            alert('Výlet byl úspěšně uložen!');
            console.log("Current stored trips:", StorageService.getAllTrips());
        });
    }
};