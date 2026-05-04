if (
  listingCoords &&
  listingCoords.length === 2 &&
  listingCoords[0] !== 0 &&
  listingCoords[1] !== 0
) {
  const map = L.map('map', { scrollWheelZoom: false })
    .setView([listingCoords[1], listingCoords[0]], 10);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([listingCoords[1], listingCoords[0]])
    .addTo(map)
    .bindPopup("Exact location provided after booking!")
    .openPopup();

} else {
  console.log("Invalid coordinates — map not loaded");
}