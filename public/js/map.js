//Leaflet JS
// Initialize the map
const map = L.map("map").setView([31.5204, 74.3587], 12); // Lahore coords

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add a marker
L.marker([31.5204, 74.3587])
  .addTo(map)
  .bindPopup("Hello from Lahore!")
  .openPopup();
