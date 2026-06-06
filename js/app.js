/**
 * Main application entry point.
 */

import { FormView } from './views/FormView.js';
import { DashboardView } from './views/DashboardView.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // Initialize views
    FormView.init();
    
    // Render initial data
    DashboardView.render();
});