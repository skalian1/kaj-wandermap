/**
 * @fileoverview View controller for rendering specific trip details and managing the Media API.
 */

import { StorageService } from '../services/StorageService.js';

/**
 * View module responsible for displaying trip details and handling media playback.
 * @namespace
 */
export const DetailView = {
    /**
     * Initializes static event listeners for the detail view, including
     * navigation and audio playback controls.
     */
    init: function() {
        const backBtn = document.getElementById('btn-back-dashboard');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                const audioEl = document.getElementById('trip-audio-element');
                
                // Stop audio playback before navigating away from the view
                if (audioEl && !audioEl.paused) {
                    audioEl.pause();
                }
                
                window.location.hash = '';
            });
        }

        const audioBtn = document.getElementById('btn-play-audio');
        const audioEl = document.getElementById('trip-audio-element');

        if (audioBtn && audioEl) {
            audioBtn.addEventListener('click', () => {
                if (audioEl.paused) {
                    // Playback is asynchronous and returns a Promise in modern browsers
                    audioEl.play().then(() => {
                        audioBtn.innerHTML = '⏸ Pause Soundtrack';
                    }).catch(err => {
                        console.error("Playback failed:", err);
                        // Retaining the alert here strictly as an error handler for failed media
                        alert("Could not play the audio file.");
                    });
                } else {
                    audioEl.pause();
                    audioBtn.innerHTML = '▶ Play Soundtrack';
                }
            });

            audioEl.addEventListener('ended', () => {
                audioBtn.innerHTML = '▶ Play Soundtrack';
            });
        }
    },

    /**
     * Populates the detail view with the specific data of the selected trip.
     * @param {string} tripId - The unique identifier of the trip to display.
     */
    render: function(tripId) {
        const trips = StorageService.getAllTrips();
        const trip = trips.find(t => t.id === tripId);

        if (!trip) {
            window.location.hash = '';
            return;
        }

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

        const ratingEl = document.getElementById('detail-rating');
        if (ratingEl) {
            ratingEl.value = trip.rating || 0;
        }

        const audioEl = document.getElementById('trip-audio-element');
        const audioBtn = document.getElementById('btn-play-audio');
        
        if (audioEl && audioBtn) {
            const defaultAudio = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3';
            audioEl.src = trip.audioUrl ? trip.audioUrl : defaultAudio;
            
            audioBtn.innerHTML = '▶ Play Soundtrack';
        }
    }
};