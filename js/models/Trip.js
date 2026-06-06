/**
 * @fileoverview Domain model for a Trip entity.
 * Satisfies KAJ requirement: OOP approach (namespace and prototypal inheritance).
 */

/**
 * Application namespace to logically group models and prevent global scope pollution.
 * @namespace
 */
export const WanderMap = {
    Models: {}
};

/**
 * Constructor function representing a Trip entity.
 * Acts as a blueprint for creating new trip objects.
 * * @constructor
 * @param {string} title - The title or destination of the trip.
 * @param {string} date - The date of the trip (e.g., YYYY-MM-DD format).
 * @param {string} notes - User's textual notes about the trip.
 * @param {number|string|null} lat - The latitude coordinate.
 * @param {number|string|null} lng - The longitude coordinate.
 * @param {number} [rating=0] - The numeric star rating (0 to 5).
 * @param {string} [audioUrl=''] - Optional URL to a soundtrack or audio note.
 */
WanderMap.Models.Trip = function(title, date, notes, lat, lng, rating = 0, audioUrl = '') {
    this.id = Date.now().toString(); 
    this.title = title;
    this.date = date;
    this.notes = notes;
    this.rating = rating;
    this.audioUrl = audioUrl;
    
    this.coords = {
        lat: (lat !== null && lat !== undefined && lat !== '') ? parseFloat(lat) : null,
        lng: (lng !== null && lng !== undefined && lng !== '') ? parseFloat(lng) : null
    };
};

/**
 * Formats the raw date string into a localized, human-readable format.
 * Attached to the prototype to share the method across all Trip instances and conserve memory.
 * * @returns {string} Formatted date string (en-US locale) or a fallback message if unknown.
 */
WanderMap.Models.Trip.prototype.getFormattedDate = function() {
    if (!this.date) {
        return "Unknown date";
    }
    
    const dateObj = new Date(this.date);
    return dateObj.toLocaleDateString('en-US'); 
};

/**
 * Checks whether the trip has valid geographical coordinates recorded.
 * * @returns {boolean} True if both latitude and longitude are present, false otherwise.
 */
WanderMap.Models.Trip.prototype.hasCoordinates = function() {
    return this.coords.lat !== null && this.coords.lng !== null;
};