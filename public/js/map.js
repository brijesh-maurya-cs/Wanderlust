const map = L.map('map', { scrollWheelZoom: false });

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let coords = listingCoords;

console.log("Listing Coords:", coords);

if (!coords || coords.length !== 2 || (coords[0] === 0 && coords[1] === 0)) {
    console.log("⚠️ No valid coords → falling back to India");
    map.setView([20.5937, 78.9629], 5);
} else {
    const lat = coords[1];
    const lon = coords[0];
    map.setView([lat, lon], 12); 

    L.marker([lat, lon])
        .addTo(map)
        .bindPopup("Exact location provided after booking!")
        .openPopup();
}

setTimeout(() => {
    map.invalidateSize();
}, 500);