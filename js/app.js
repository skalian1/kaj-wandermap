/**
 * @fileoverview Main application entry point.
 * Bootstraps the WanderMap SPA by initializing views, components, map services, and routing.
 */

import { FormView } from './views/FormView.js';
import { DashboardView } from './views/DashboardView.js';
import { Router } from './services/Router.js';
import { MapView } from './views/MapView.js';
import { DetailView } from './views/DetailView.js';
import { StarRating } from './components/StarRating.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    FormView.init();
    DetailView.init();
    DashboardView.render();
    
    MapView.init();
    
    // The Router must be initialized last to correctly evaluate the startup URL hash
    // against the newly constructed DOM and view states.
    Router.init();
});