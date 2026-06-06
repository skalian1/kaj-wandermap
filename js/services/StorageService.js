/**
 * @fileoverview LocalStorage wrapper service for data persistence.
 * Satisfies KAJ requirement: Advanced JS API (LocalStorage).
 */

import { WanderMap } from '../models/Trip.js';

/**
 * Service responsible for serializing and deserializing Trip entities to and from the browser's LocalStorage.
 * @namespace
 */
export const StorageService = {
    /**
     * Key used to identify the data payload within LocalStorage.
     * @constant {string}
     */
    STORAGE_KEY: 'wandermap_trips',

    /**
     * Retrieves all trips from LocalStorage and reconstructs them into functional Trip instances.
     * This reconstruction is crucial to restore access to prototype methods after JSON parsing.
     * @returns {Array<WanderMap.Models.Trip>} An array of fully instantiated Trip objects.
     */
    getAllTrips: function() {
        const tripsJson = localStorage.getItem(this.STORAGE_KEY);
        
        if (!tripsJson) {
            return [];
        }
        
        const plainTrips = JSON.parse(tripsJson);
        
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
            
            // Explicitly restore the original ID to override the newly generated one from the constructor
            trip.id = tripData.id; 
            return trip;
        });
    },

    /**
     * Appends a newly created trip to the existing collection and persists the updated array to LocalStorage.
     * @param {WanderMap.Models.Trip} trip - The instantiated Trip object to save.
     */
    saveTrip: function(trip) {
        const currentTrips = this.getAllTrips();
        currentTrips.push(trip);
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentTrips));
        console.log("Trip saved successfully to LocalStorage.");
    }
};