let map;
let routePolyline;
let errorMessageDiv;


function initMap() {
    errorMessageDiv = document.getElementById('errorMessage');


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.69096, lng: 9.140625 }, 
        zoom: 4, 
    });


    if (routePolyline) {
        routePolyline.setMap(null);
    }
}


function drawRoute(coordinates) {
    if (routePolyline) {
        routePolyline.setMap(null); 
    }

    routePolyline = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4
    });

    routePolyline.setMap(map);

   
    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds);
}


function showErrorMessage(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = message ? 'block' : 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    const countryCodesInput = document.getElementById('countryCodes');
    const showRouteBtn = document.getElementById('showRouteBtn');

    showRouteBtn.addEventListener('click', async () => {
        const countryCodes = countryCodesInput.value.trim();
        showErrorMessage(''); 
        if (!countryCodes) {
            showErrorMessage('Lütfen ülke kodlarını girin.');
            return;
        }

        try {
            const response = await fetch('/api/routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country_codes: countryCodes })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.route && data.route.length > 0) {
                    const coordinates = data.route.map(item => ({ lat: item.lat, lng: item.lng }));
                    drawRoute(coordinates);
                } else {
                    showErrorMessage('Rota verisi bulunamadı.');
                }
            } else {
                
                showErrorMessage(data.error || 'Bir hata oluştu.');
            }
        } catch (error) {
            console.error('API isteği sırasında hata:', error);
            showErrorMessage('Sunucuya bağlanılamadı veya beklenmeyen bir hata oluştu.');
        }
    });
}); 