/**
 * @fileoverview Single Page Application (SPA) routing service.
 * Satisfies KAJ requirement: Functional history (History API).
 */

import { DetailView } from '../views/DetailView.js';

/**
 * Router service managing application navigation and view state.
 * Handles URL hash changes without page reloads using the native History API.
 * @namespace
 */
export const Router = {
    /**
     * Initializes the routing service.
     * Binds event listeners for browser navigation (Back/Forward) and header UI buttons.
     * Evaluates the initial URL to render the correct view on startup.
     */
    init: function() {
        window.addEventListener('popstate', () => {
            this.updateView(window.location.hash);
        });

        const navDashboard = document.getElementById('nav-dashboard');
        const navNewTrip = document.getElementById('nav-new-trip');

        if (navDashboard) {
            navDashboard.addEventListener('click', () => {
                this.navigate(''); 
            });
        }

        if (navNewTrip) {
            navNewTrip.addEventListener('click', () => {
                this.navigate('#new');
            });
        }

        this.updateView(window.location.hash);
    },

    /**
     * Updates the browser URL history and renders the corresponding view.
     * @param {string} hash - The target URL hash (e.g., '#new', '#detail-123', or empty string).
     */
    navigate: function(hash) {
        // Fallback to the current pathname if the hash is empty to maintain clean URLs
        history.pushState(null, '', hash || window.location.pathname);
        this.updateView(hash);
    },

    /**
     * Toggles the visibility of DOM view containers based on the active route.
     * Delegates data rendering to specific view controllers when necessary.
     * @param {string} hash - The current URL hash to evaluate.
     */
    updateView: function(hash) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        if (hash === '#new') {
            document.getElementById('view-form').classList.add('active');
        } else if (hash.startsWith('#detail-')) {
            const tripId = hash.replace('#detail-', '');
            DetailView.render(tripId);
            document.getElementById('view-detail').classList.add('active');
        } else {
            document.getElementById('view-dashboard').classList.add('active');
        }
    }
};