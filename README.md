# WanderMap: Personal Travel Diary

## Project Objective
WanderMap is a Single Page Application (SPA) designed as an interactive web diary for travelers. It allows users to intuitively log visited locations, create a personal memory map, and easily browse past trips. The application provides a seamless experience on a single screen without continuous reloading and is fully responsive for both desktop and mobile use.

## Application Structure & Features
The interface is divided into three main views with smooth transitions:
1. **Dashboard (Main Overview):** Displays an interactive map with pins of past trips alongside a list of visited locations.
2. **Trip Detail:** A dedicated page for a specific trip, showing saved notes, ratings, and media.
3. **New Location Entry:** A form for logging a new trip.

### Key Functionalities
- **Adding Locations:** Captures GPS location via Geolocation API, along with date, notes, and personal ratings.
- **Interactive Map:** Visually represents visited locations.
- **Local Data Storage:** All entries are saved directly in the browser's LocalStorage.
- **Responsive Design:** Adapts layout dynamically based on device screen size.

## Technologies Used
- HTML5
- CSS3 (Transitions, Media Queries, Nested CSS)
- Vanilla JavaScript (ES6+, OOP, History API)

## How to Run
Since the application uses LocalStorage and client-side routing, simply open `index.html` in any modern web browser, or use a local development server (e.g., Live Server extension in VS Code) for the best experience.