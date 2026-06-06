# WanderMap: Personal Travel Diary

## Project Overview
WanderMap is an interactive Single Page Application (SPA) designed as a personal travel diary. It allows users to seamlessly log visited locations, capture geographical coordinates, write notes, assign star ratings, and view their travels on an interactive map.

**Live Demo:** [https://skalian1.github.io/kaj-wandermap/]
**Repository URL:** [https://github.com/skalian1/kaj-wandermap]

## Architecture
The application is built using vanilla web technologies (HTML5, CSS3, JavaScript ES6+) without any heavy frameworks (like React or Angular). It utilizes a modular architecture dividing the logic into Models, Views, and Services to prevent spaghetti code.

---

## Features & Limitations

### Core Functionality
* **Trip Logging:** Users can log new trips by providing a title, date, textual notes, and a 1-5 star rating.
* **Geolocation:** One-click fetching of the user's current GPS coordinates via the browser's Geolocation API.
* **Trip Soundtrack:** Users can attach an external audio URL to their trip records, playing or pausing the soundtrack directly from the detail view via a custom JS interface.
* **Interactive Map:** Trips with valid coordinates are automatically plotted as clickable pins on an embedded Leaflet map (OpenStreetMap).
* **Trip Dashboard & Details:** Users can browse a list of all past trips and click any entry (or map pin) to open a detailed, read-only summary.
* **SPA Navigation:** Seamless transitions between views (Dashboard, Form, Detail) using the History API, with full support for the browser's Back/Forward buttons.
* **Modern UX & Notifications:** Non-blocking, animated toast notifications provide smooth user feedback (e.g., upon saving a trip) instead of intrusive browser alerts.
* **Persistent Storage:** All data is saved automatically to the browser's LocalStorage, ensuring records persist between sessions.

### Known Limitations
* **Local Data Only:** Data is bound to the specific browser and device. There is no backend synchronization or cloud backup.
* **No Geocoding:** Users cannot search for a destination by typing an address. Location is obtained exclusively via GPS or left empty.
* **Map Pin Overlap:** Multiple trips recorded at the exact same GPS coordinates render pins directly on top of each other (marker clustering is not implemented).
* **Limited Media Uploads:** The application does not support direct file uploads for photos, videos, or local MP3 files (audio is linked via external URLs only to prevent exceeding LocalStorage limits).

---

## Course Requirements Mapping (KAJ)

The following table explicitly maps the KAJ course requirements to their implementation status within this project.

| Category | Requirement | Status | Implementation Details / Location |
| :--- | :--- | :--- | :--- |
| **HTML5** | HTML5 Validity | ✅ Implemented | Valid `<!DOCTYPE html>` structure (`index.html`). |
| **HTML5** | Semantic Tags | ✅ Implemented | Used `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` (`index.html`). |
| **HTML5** | SVG / Canvas Graphics | ❌ Not Implemented | - |
| **HTML5** | Audio / Video Media | ✅ Implemented | Embedded `<audio>` element for trip soundtracks (`index.html`). |
| **HTML5** | Form Elements | ✅ Implemented | Native validation (`required`), `autofocus`, `placeholder`, `type="date"` (`index.html`). |
| **CSS3** | Advanced Selectors | ✅ Implemented | `nth-child(even)`, direct child `> label`, attribute selectors (`css/style.css`). |
| **CSS3** | 2D/3D Transformations | ✅ Implemented | Hover states use `transform: translateX` and `translateY` (`css/style.css`). |
| **CSS3** | Transitions / Animations | ✅ Implemented | `@keyframes fadeInView` and smooth hover transitions (`css/style.css`). |
| **CSS3** | Media Queries | ✅ Implemented | Responsive breakpoints at `992px` and `768px` (`css/style.css`). |
| **CSS3** | Nested CSS | ✅ Implemented | Native CSS nesting used globally (`css/style.css`). |
| **JavaScript** | OOP Approach | ✅ Implemented | Namespace `WanderMap.Models` and prototypal inheritance (`js/models/Trip.js`). |
| **JavaScript** | JS Framework/Library | ❌ Not Implemented | Vanilla JS used for core logic (Leaflet used only for maps, not UI rendering). |
| **JavaScript** | Advanced JS APIs | ✅ Implemented | LocalStorage API (`StorageService.js`) and Geolocation API (`FormView.js`). |
| **JavaScript** | Functional History | ✅ Implemented | History API (`pushState`, `popstate`) used for SPA routing (`js/services/Router.js`). |
| **JavaScript** | Media API Control | ✅ Implemented | Custom play/pause logic checking `.paused` state and utilizing `.play()` Promise (`js/views/DetailView.js`).
| **JavaScript** | Offline Application | ❌ Not Implemented | Data persists locally, but no Service Workers/Manifest for true offline capability. |
| **JavaScript** | SVG Manipulation via JS | ❌ Not Implemented | - |
| **JavaScript** | Web Component | ✅ Implemented | Custom `<star-rating>` element utilizing Shadow DOM (`js/components/StarRating.js`). |
| **Other** | Completeness | ✅ Implemented | Fully functional SPA addressing the main objective. |
| **Other** | Aesthetics | ✅ Implemented | Unified design system, CSS variables, consistent typography and shadows. |

---

## How to Run Locally
1. Clone the repository.
2. No build tools or Node.js are required.
3. Because the application utilizes ES6 Modules (`type="module"`) and LocalStorage, it must be run via a local web server (opening the file directly via `file://` protocol will cause CORS errors in modern browsers).
4. Use an extension like **Live Server** in VS Code, or run `npx serve` / `python -m http.server` in the project directory.