/**
 * Main application entry point.
 */

import { FormView } from './views/FormView.js';
import { DashboardView } from './views/DashboardView.js';
import { Router } from './services/Router.js';
import { MapView } from './views/MapView.js'; // NEW IMPORT

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // Initialize views and navigation
    FormView.init();
    DashboardView.render();
    
    // Initialize the map
    MapView.init();
    
    // Initialize the Router last
    Router.init();
});