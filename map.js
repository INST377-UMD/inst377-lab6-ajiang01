function createMap() {
	var map = L.map('map').setView([38.7946, -106.5348], 3);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// Get random (lat, lon) 3 times
	for (let i = 1; i <= 3; i++) {
	const lat = getRandomInRange(30, 35, 3);
	const lon = getRandomInRange(-90, -100, 3);

	let marker = L.marker([lat, lon]).addTo(map);

	document.getElementById(`lat${i}`).textContent = lat;
	document.getElementById(`lon${i}`).textContent = lon;

	fetch_locality(lat, lon, i);
}
}

// Get random coordinate number (provided)
function getRandomInRange(from, to, fixed) {
return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// API fetch
function fetch_locality(lat, lon, marker_num) {
	fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                let locality = data.locality || "Unknown locality";
                document.getElementById(`locality${marker_num}`).textContent = locality;
})
}


window.onload = createMap;