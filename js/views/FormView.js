/**
 * @fileoverview View controller for handling the new trip creation form.
 * Manages form submission, Geolocation API integration, and user feedback.
 */

import { WanderMap } from '../models/Trip.js';
import { StorageService } from '../services/StorageService.js';
import { DashboardView } from './DashboardView.js';
import { Router } from '../services/Router.js';
import { MapView } from './MapView.js';

/**
 * View module responsible for the trip data entry form.
 * @namespace
 */
export const FormView = {
    /**
     * Initializes form event listeners, including geolocation requests and submit handling.
     */
    init: function() {
        const form = document.getElementById('new-trip-form');
        if (!form) return;

        const btnLocation = document.getElementById('btn-get-location');
        
        if (btnLocation) {
            btnLocation.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser.');
                    return;
                }

                const originalText = btnLocation.innerText;
                btnLocation.innerText = 'Locating...';
                btnLocation.disabled = true;

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        document.getElementById('trip-lat').value = position.coords.latitude;
                        document.getElementById('trip-lng').value = position.coords.longitude;
                        
                        btnLocation.innerText = 'Location Acquired!';
                        btnLocation.style.backgroundColor = '#27ae60';
                    },
                    (error) => {
                        console.error('Error obtaining location:', error);
                        alert('Unable to retrieve your location. Check your browser permissions.');
                        
                        btnLocation.innerText = originalText;
                        btnLocation.disabled = false;
                    }
                );
            });
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = document.getElementById('trip-title').value;
            const date = document.getElementById('trip-date').value;
            const notes = document.getElementById('trip-notes').value;
            const ratingElement = document.getElementById('trip-rating');
            const rating = ratingElement ? ratingElement.value : 0;
            const audioUrl = document.getElementById('trip-audio').value;
            const lat = document.getElementById('trip-lat').value || null;
            const lng = document.getElementById('trip-lng').value || null;

            const newTrip = new WanderMap.Models.Trip(title, date, notes, lat, lng, rating, audioUrl);
            StorageService.saveTrip(newTrip);

            // Reset form state and UI elements
            form.reset();

            if (ratingElement) {
                ratingElement.value = 0;
            }
            
            if (btnLocation) {
                btnLocation.innerText = 'Get My Location';
                btnLocation.style.backgroundColor = '';
                btnLocation.disabled = false;
            }

            document.getElementById('trip-title').focus();
            
            // Refresh dependent views
            DashboardView.render();
            MapView.renderPins();

            // Trigger non-blocking toast notification
            const toast = document.getElementById('toast-notification');
            if (toast) {
                toast.textContent = `Trip to "${title}" successfully saved!`;
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
            
            Router.navigate('');
        });
    }
};