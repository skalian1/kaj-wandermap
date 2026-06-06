/**
 * Main application entry point.
 */

import { FormView } from './views/FormView.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("WanderMap: Modular architecture initialized.");
    
    // Initialize the form logic
    FormView.init();
});