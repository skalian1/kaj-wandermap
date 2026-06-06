// js/views/DashboardView.js

import { StorageService } from '../services/StorageService.js';

export const DashboardView = {
    /**
     * Renders the list of trips into the dashboard sidebar.
     */
    render: function() {
        const ulElement = document.getElementById('trips-ul');
        if (!ulElement) return;

        // 1. Clear the current placeholder or outdated list
        ulElement.innerHTML = '';

        // 2. Fetch all trips from our storage
        const trips = StorageService.getAllTrips();

        // 3. Handle empty state
        if (trips.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No trips recorded yet.';
            ulElement.appendChild(li);
            return;
        }

        // 4. Generate DOM elements for each trip
        trips.forEach(trip => {
            // Create list item
            const li = document.createElement('li');
            
            // Save the ID into a data attribute so we can identify it later (for the detail view)
            li.dataset.id = trip.id;

            li.addEventListener('click', () => {
                window.location.hash = '#detail-' + trip.id;
            });

            // Create strong element for the title
            const titleElement = document.createElement('strong');
            titleElement.textContent = trip.title;

            // Create span for the formatted date (using our OOP prototype method!)
            const dateElement = document.createElement('span');
            dateElement.textContent = ` (${trip.getFormattedDate()})`;

            // Append child elements to the list item
            li.appendChild(titleElement);
            li.appendChild(dateElement);

            // Append the fully constructed list item to the main list
            ulElement.appendChild(li);
        });
    }
};