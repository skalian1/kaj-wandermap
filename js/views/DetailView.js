// js/views/DetailView.js

import { StorageService } from '../services/StorageService.js';

export const DetailView = {
    init: function() {
        // Setup the back button to simply clear the hash, returning to the dashboard
        const backBtn = document.getElementById('btn-back-dashboard');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.hash = '';
            });
        }
    },

    /**
     * Populates the detail view with data for a specific trip.
     * @param {string} tripId - The ID of the trip to display
     */
    render: function(tripId) {
        const trips = StorageService.getAllTrips();
        // Find the specific trip by its ID
        const trip = trips.find(t => t.id === tripId);

        if (!trip) {
            console.error('Trip not found:', tripId);
            window.location.hash = ''; // Redirect to dashboard if invalid ID
            return;
        }

        // Populate standard DOM elements
        document.getElementById('detail-title').textContent = trip.title;
        document.getElementById('detail-date').textContent = trip.getFormattedDate();
        
        const notesEl = document.getElementById('detail-notes');
        notesEl.textContent = trip.notes ? trip.notes : 'No notes provided.';

        const coordsEl = document.getElementById('detail-coords');
        if (trip.hasCoordinates()) {
            coordsEl.textContent = `${trip.coords.lat.toFixed(4)}, ${trip.coords.lng.toFixed(4)}`;
        } else {
            coordsEl.textContent = 'Location not recorded.';
        }

        // Set the rating on our custom Web Component
        const ratingEl = document.getElementById('detail-rating');
        if (ratingEl) {
            ratingEl.value = trip.rating || 0;
        }
    }
};