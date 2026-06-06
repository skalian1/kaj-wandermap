/**
 * Main application entry point.
 */

import { WanderMap } from './models/Trip.js';
import { StorageService } from './services/StorageService.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // TEST STORAGE SERVICE
    // 1. Check what is currently in the storage
    let myTrips = StorageService.getAllTrips();
    console.log("Loaded trips at startup:", myTrips);

    // 2. If the storage is empty, let's create and save a dummy trip
    if (myTrips.length === 0) {
        const testTrip = new WanderMap.Models.Trip(
            "Dublin Weekend", 
            "2026-02-08", 
            "Visiting historical sites and Vikings.", 
            53.349805, 
            -6.26031
        );
        
        console.log("Saving test trip...");
        StorageService.saveTrip(testTrip);
        
        // Reload to verify it was saved
        myTrips = StorageService.getAllTrips();
        console.log("Trips after saving:", myTrips);
    }

    // Verify prototype methods still work after reloading from JSON
    if (myTrips.length > 0) {
        console.log("Formatted date of the first trip:", myTrips[0].getFormattedDate());
    }
});