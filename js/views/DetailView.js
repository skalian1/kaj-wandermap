// js/views/DetailView.js

import { StorageService } from '../services/StorageService.js';

export const DetailView = {
    init: function() {
        // Setup the back button to simply clear the hash, returning to the dashboard
        const backBtn = document.getElementById('btn-back-dashboard');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Pause audio when leaving the detail view
                const audioEl = document.getElementById('trip-audio-element');
                if (audioEl && !audioEl.paused) {
                    audioEl.pause();
                }
                window.location.hash = '';
            });
        }

        // JS Media API Control
        const audioBtn = document.getElementById('btn-play-audio');
        const audioEl = document.getElementById('trip-audio-element');

        if (audioBtn && audioEl) {
            audioBtn.addEventListener('click', () => {
                // Check the paused property of the HTMLMediaElement
                if (audioEl.paused) {
                    // Play returns a Promise in modern browsers
                    audioEl.play().then(() => {
                        audioBtn.innerHTML = '⏸ Pause Soundtrack';
                    }).catch(err => {
                        console.error("Playback failed:", err);
                        alert("Could not play the audio file.");
                    });
                } else {
                    audioEl.pause();
                    audioBtn.innerHTML = '▶ Play Soundtrack';
                }
            });

            // Automatically reset button text when audio finishes playing
            audioEl.addEventListener('ended', () => {
                audioBtn.innerHTML = '▶ Play Soundtrack';
            });
        }
    },

    render: function(tripId) {
        const trips = StorageService.getAllTrips();
        // Find the specific trip by its ID
        const trip = trips.find(t => t.id === tripId);

        if (!trip) {
            window.location.hash = '';
            return;
        }

        // Populate standard DOM elements
        document.getElementById('detail-title').textContent = trip.title;
        document.getElementById('detail-date').textContent = trip.getFormattedDate();
        
        const notesEl = document.getElementById('detail-notes');
        notesEl.textContent = trip.notes ? trip.notes : 'No notes provided.';

        const coordsEl = document.getElementById('detail-coords');
        if (trip.hasCoordinates()) {
            coordsEl.textContent = `${trip.coords.lat.toFixed(4)}, ${trip.coords.lng.toFixed(4)}`;
        } else {
            coordsEl.textContent = 'Location not recorded.';
        }

        // Set the rating on our custom Web Component
        const ratingEl = document.getElementById('detail-rating');
        if (ratingEl) {
            ratingEl.value = trip.rating || 0;
        }

        // NEW: Setup audio source
        const audioEl = document.getElementById('trip-audio-element');
        const audioBtn = document.getElementById('btn-play-audio');
        
        if (audioEl && audioBtn) {
            // Use user's URL or fallback to a default free nature sound
            const defaultAudio = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3';
            audioEl.src = trip.audioUrl ? trip.audioUrl : defaultAudio;
            
            // Reset button state
            audioBtn.innerHTML = '▶ Play Soundtrack';
        }
    }
};