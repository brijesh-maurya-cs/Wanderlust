const map = L.map('map',{ scrollWheelZoom: false }).setView([listingCoords[1],listingCoords[0]], 10); 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap'}).addTo(map);


 L.marker([listingCoords[1],listingCoords[0]])
        .addTo(map)
        .bindPopup("Exact location provided after booking!")
        .openPopup();
