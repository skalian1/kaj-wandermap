// js/services/StorageService.js
// REQUIREMENT: Advanced JS API (LocalStorage)

import { WanderMap } from '../models/Trip.js';

export const StorageService = {
    // Key under which we save our data in the browser
    STORAGE_KEY: 'wandermap_trips',

    /**
     * Retrieves all trips from LocalStorage and reconstructs them into Trip instances.
     * @returns {Array} Array of Trip objects
     */
    getAllTrips: function() {
        const tripsJson = localStorage.getItem(this.STORAGE_KEY);
        
        // If there is no data, return an empty array
        if (!tripsJson) {
            return [];
        }
        
        // Parse JSON string back to plain JavaScript objects
        const plainTrips = JSON.parse(tripsJson);
        
        // Convert plain objects back to WanderMap.Models.Trip instances
        // This is crucial to retain access to prototype methods like getFormattedDate()
        return plainTrips.map(tripData => {
            const trip = new WanderMap.Models.Trip(
                tripData.title,
                tripData.date,
                tripData.notes,
                tripData.coords.lat,
                tripData.coords.lng,
                tripData.rating,
                tripData.audioUrl
            );
            // We must explicitly restore the original ID, otherwise the constructor makes a new one
            trip.id = tripData.id; 
            return trip;
        });
    },

    /**
     * Adds a new trip to the array and saves it back to LocalStorage.
     * @param {Object} trip - The Trip instance to save
     */
    saveTrip: function(trip) {
        // Fetch existing trips
        const currentTrips = this.getAllTrips();
        
        // Add the new one
        currentTrips.push(trip);
        
        // Serialize the whole array to JSON string and store it
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentTrips));
        console.log("Trip saved successfully to LocalStorage.");
    }
};