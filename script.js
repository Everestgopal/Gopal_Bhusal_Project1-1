// This is a leaflet map showing the boundary layer of the missouri and point layer og the dams of missouri when pop up
var map = L.map('map').setView([38.5739, -92.6038], 7); // Centered at Missouri with zoom level 7

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Load GeoJSON data for Missouri boundary
    fetch('https://raw.githubusercontent.com/Everestgopal/Project1.1_GopalBhusal/main/Missourishape.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load Missouri boundary GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        console.log('Missouri boundary GeoJSON data:', data);
        L.geoJSON(data, {
            style: {
                fillColor: 'none',  // Transparent fill color
                color: "blue",      // Border color
                weight: 2           // Border weight
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading Missouri boundary GeoJSON:', error);
    });

    // Load GeoJSON data for dams
    fetch('https://raw.githubusercontent.com/Everestgopal/Project1.1_GopalBhusal/main/dams.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load dams GeoJSON');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dams GeoJSON data:', data);
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                var marker = L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: "red",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });

                // Add popup to each marker with the name
                marker.bindPopup(feature.properties.name); // Corrected to use 'Name' property
                return marker;
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading dams GeoJSON:', error);
    });