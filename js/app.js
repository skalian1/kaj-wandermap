/**
 * Main application entry point.
 */

import { FormView } from './views/FormView.js';
import { DashboardView } from './views/DashboardView.js';
import { Router } from './services/Router.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // Initialize views and navigation
    FormView.init();
    DashboardView.render();
    
    // Initialize the Router last to handle the initial URL state correctly
    Router.init();
});