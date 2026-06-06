/**
 * @fileoverview View controller for rendering the dashboard trip list.
 */

import { StorageService } from '../services/StorageService.js';

/**
 * View module responsible for managing and rendering the dashboard sidebar.
 * @namespace
 */
export const DashboardView = {
    /**
     * Fetches trip data from storage and dynamically generates DOM elements
     * to populate the unordered list in the dashboard interface.
     */
    render: function() {
        const ulElement = document.getElementById('trips-ul');
        if (!ulElement) return;

        ulElement.innerHTML = '';

        const trips = StorageService.getAllTrips();

        if (trips.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No trips recorded yet.';
            ulElement.appendChild(li);
            return;
        }

        trips.forEach(trip => {
            const li = document.createElement('li');
            
            // Store the ID to map the UI element to the corresponding data entity
            li.dataset.id = trip.id;

            // Trigger SPA routing to the detail view upon click
            li.addEventListener('click', () => {
                window.location.hash = '#detail-' + trip.id;
            });

            const titleElement = document.createElement('strong');
            titleElement.textContent = trip.title;

            const dateElement = document.createElement('span');
            // Utilize the prototypal method to ensure consistent date formatting
            dateElement.textContent = ` (${trip.getFormattedDate()})`;

            li.appendChild(titleElement);
            li.appendChild(dateElement);
            ulElement.appendChild(li);
        });
    }
};