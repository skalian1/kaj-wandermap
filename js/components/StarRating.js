// js/components/StarRating.js
// REQUIREMENT: Web Component (Custom HTML Element)

export class StarRating extends HTMLElement {
    constructor() {
        super();
        // Attach Shadow DOM to encapsulate styles and markup
        this.attachShadow({ mode: 'open' });
        this.stars = [];
        this._value = 0; // Default rating
    }

    // Called when the element is inserted into the DOM
    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    // Getter and setter to easily read/write the rating value from other scripts
    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        this.updateStars();
    }

    render() {
        // We define styles directly inside the Shadow DOM so they don't leak out
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
                /* Interactive hover effects only if NOT readonly */
                :host(:not([readonly])) .star-container {
                    cursor: pointer;
                }
                :host(:not([readonly])) .star:hover ~ .star {
                    color: #ccc !important;
                }
                :host(:not([readonly])) .star-container:hover .star {
                    color: #f1c40f; /* Gold color on hover */
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
        this.stars = this.shadowRoot.querySelectorAll('.star');
        this.updateStars();
    }

    setupEvents() {
        // If the component has a 'readonly' attribute, we don't attach click listeners
        if (this.hasAttribute('readonly')) return;

        this.stars.forEach(star => {
            star.addEventListener('click', (e) => {
                // Update value when a star is clicked
                this.value = parseInt(e.target.dataset.value);
            });
        });
    }

    updateStars() {
        // Highlight stars up to the current value
        this.stars.forEach(star => {
            if (parseInt(star.dataset.value) <= this._value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// Register the component with the browser so we can use <star-rating> tag
customElements.define('star-rating', StarRating);