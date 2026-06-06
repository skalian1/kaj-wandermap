// js/views/FormView.js

import { WanderMap } from '../models/Trip.js';
import { StorageService } from '../services/StorageService.js';

export const FormView = {
    init: function() {
        const form = document.getElementById('new-trip-form');
        if (!form) return;

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

            // 5. Return focus to the first input field programmatically
            document.getElementById('trip-title').focus();

            // Temporary user feedback
            alert('Výlet byl úspěšně uložen!');
            console.log("Current stored trips:", StorageService.getAllTrips());
        });
    }
};