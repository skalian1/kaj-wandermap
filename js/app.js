/**
 * Main application entry point.
 */

// Import the namespace containing our Trip model
import { WanderMap } from './models/Trip.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // TEST: Let's create a dummy trip to verify our OOP implementation works
    const testTrip = new WanderMap.Models.Trip(
        "Dublin Weekend", 
        "2026-02-08", 
        "Visiting historical sites and Vikings.", 
        53.349805, 
        -6.26031
    );

    console.log("Test Trip created:", testTrip);
    console.log("Formatted Date test:", testTrip.getFormattedDate());
    console.log("Has coordinates?", testTrip.hasCoordinates());

    // Future logic:
    // 1. Initialize StorageService
    // 2. Initialize MapView
    // 3. Bind navigation events
});