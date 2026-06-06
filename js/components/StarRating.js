/**
 * @fileoverview Custom Web Component providing interactive or read-only star rating functionality.
 * Satisfies KAJ requirement: Web Component (Custom HTML Element).
 */

export class StarRating extends HTMLElement {
    /**
     * Creates an instance of StarRating.
     * Attaches the open Shadow DOM and initializes local state.
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.stars = [];
        this._value = 0;
    }

    /**
     * Lifecycle callback triggered automatically when the element is appended to the DOM.
     */
    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    /**
     * Gets the current rating value.
     * @returns {number} Current rating score (0 to 5).
     */
    get value() {
        return this._value;
    }

    /**
     * Sets the rating value and refreshes the visual state of the component.
     * @param {number} v - The new rating score.
     */
    set value(v) {
        this._value = v;
        this.updateStars();
    }

    /**
     * Renders the component's HTML markup and encapsulates internal styles inside the Shadow DOM.
     */
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .star-container {
                    display: inline-flex;
                    font-size: 2rem;
                    color: #ccc;
                    user-select: none;
                }
                .star {
                    transition: color 0.2s;
                }
                /* Interactive hover and state rules applied only if not read-only */
                :host(:not([readonly])) .star-container {
                    cursor: pointer;
                }
                :host(:not([readonly])) .star:hover ~ .star {
                    color: #ccc !important;
                }
                :host(:not([readonly])) .star-container:hover .star {
                    color: #f1c40f;
                }
                .star.active {
                    color: #f1c40f;
                }
            </style>
            <div class="star-container">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
        `;
        
        // Cache internal DOM element references after rendering
        this.stars = this.shadowRoot.querySelectorAll('.star');
        this.updateStars();
    }

    /**
     * Binds click event listeners to the star elements for interactive selection.
     * Aborts execution if the component is marked as read-only.
     */
    setupEvents() {
        if (this.hasAttribute('readonly')) return;

        this.stars.forEach(star => {
            star.addEventListener('click', (e) => {
                // Best Practice: Always supply the radix parameter to parseInt
                this.value = parseInt(e.target.dataset.value, 10);
            });
        });
    }

    /**
     * Toggles the active highlight class on stars according to the current numeric value.
     */
    updateStars() {
        this.stars.forEach(star => {
            const starValue = parseInt(star.dataset.value, 10);
            
            if (starValue <= this._value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// Register the custom element definition within the global customElements registry
customElements.define('star-rating', StarRating);