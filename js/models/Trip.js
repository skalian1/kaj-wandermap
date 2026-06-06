// js/models/Trip.js
// REQUIREMENT: OOP approach - namespace and prototypal inheritance

// 1. Namespace creation
// We use a constant object to act as a namespace to logically group our code
export const WanderMap = {
    Models: {}
};

// 2. Constructor Function
// This acts as a blueprint for creating new trip objects
WanderMap.Models.Trip = function(title, date, notes, lat, lng) {
    // Generate a simple unique ID using current timestamp
    this.id = Date.now().toString(); 
    this.title = title;
    this.date = date;
    this.notes = notes;
    this.coords = {
        lat: lat || null,
        lng: lng || null
    };
};

// 3. Prototypal Methods
// Attaching methods to the prototype ensures they are shared across all instances
// saving memory instead of creating a new copy of the function for every trip
WanderMap.Models.Trip.prototype.getFormattedDate = function() {
    if (!this.date) {
        return "Unknown date";
    }
    const dateObj = new Date(this.date);
    // Returns date in standard locale format
    return dateObj.toLocaleDateString('en-US'); 
};

WanderMap.Models.Trip.prototype.hasCoordinates = function() {
    return this.coords.lat !== null && this.coords.lng !== null;
};