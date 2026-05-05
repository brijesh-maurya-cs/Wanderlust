const map = L.map('map', { scrollWheelZoom: false });

let coords = listingCoords;

if (!coords || coords.length !== 2) {
  console.log("⚠️ No coords → fallback India");
  map.setView([20.5937, 78.9629], 5);
} else {
  map.setView([coords[1], coords[0]], 6);
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

if (coords && coords.length === 2) {
  L.marker([coords[1], coords[0]])
    .addTo(map)
    .bindPopup("Exact location provided after booking!")
    .openPopup();
}