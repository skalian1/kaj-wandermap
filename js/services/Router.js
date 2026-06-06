// js/services/Router.js
// REQUIREMENT: Functional history (History API)

export const Router = {
    init: function() {
        // Listen to browser's Back/Forward buttons (popstate event)
        window.addEventListener('popstate', () => {
            this.updateView(window.location.hash);
        });

        // Attach click events to header navigation buttons
        const navDashboard = document.getElementById('nav-dashboard');
        const navNewTrip = document.getElementById('nav-new-trip');

        if (navDashboard) {
            navDashboard.addEventListener('click', () => {
                this.navigate(''); // Empty string means root/dashboard
            });
        }

        if (navNewTrip) {
            navNewTrip.addEventListener('click', () => {
                this.navigate('#new');
            });
        }

        // Handle the initial page load based on current URL hash
        this.updateView(window.location.hash);
    },

    /**
     * Changes the URL without reloading the page and updates the view.
     * @param {string} hash - The target hash (e.g., '#new')
     */
    navigate: function(hash) {
        // history.pushState(stateObject, title, url)
        // We use hash fallback to ensure clean URL if hash is empty
        history.pushState(null, '', hash || window.location.pathname);
        
        // Update the visible UI based on the new hash
        this.updateView(hash);
    },

    /**
     * Toggles the 'active' class on view containers based on the hash.
     * @param {string} hash - The current URL hash
     */
    updateView: function(hash) {
        // 1. Hide all views by removing 'active' class
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // 2. Determine which view to show based on hash
        if (hash === '#new') {
            document.getElementById('view-form').classList.add('active');
        } else if (hash.startsWith('#detail-')) {
            document.getElementById('view-detail').classList.add('active');
            // Logic for loading specific trip details will be added later
        } else {
            // Default fallback is always the dashboard
            document.getElementById('view-dashboard').classList.add('active');
        }
    }
};