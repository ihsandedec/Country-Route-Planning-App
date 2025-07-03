let map;
let routePolyline;
let errorMessageDiv;
let countries = []; // Dinamik olarak yüklenecek

// Google Haritasını başlatan fonksiyon
function initMap() {
    errorMessageDiv = document.getElementById('errorMessage');

    // Haritayı Avrupa merkezine odakla
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.69096, lng: 9.140625 }, // Avrupa merkezi civarı
        zoom: 4, // Başlangıç yakınlaştırma seviyesi
    });

    // Daha önce çizilmiş bir rota varsa kaldır
    if (routePolyline) {
        routePolyline.setMap(null);
    }
}

// Rota çizme fonksiyonu
function drawRoute(coordinates) {
    if (routePolyline) {
        routePolyline.setMap(null); // Önceki rotayı temizle
    }

    routePolyline = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 4
    });

    routePolyline.setMap(map);

    // Rotayı haritada ortala
    const bounds = new google.maps.LatLngBounds();
    coordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds);
}

// Hata mesajını göster/gizle
function showErrorMessage(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = message ? 'block' : 'none';
}

// Ülke kodlarını backend'den al
async function loadCountries() {
    try {
        const response = await fetch('/api/countries');
        
        if (response.ok) {
            const data = await response.json();
            countries = data;
            displayCountryCodes();
        } else {
            console.error('Ülke verileri yüklenemedi');
            // Yedek olarak boş liste göster
            displayCountryCodes();
        }
    } catch (error) {
        console.error('Ülke verileri yüklenirken hata:', error);
        displayCountryCodes();
    }
}

// Ülke kodlarını sayfada göster
function displayCountryCodes() {
    const countryGrid = document.getElementById('countryGrid');
    
    if (countries.length === 0) {
        countryGrid.innerHTML = '<div class="loading">Ülke kodları yükleniyor...</div>';
        return;
    }
    
    countryGrid.innerHTML = ''; // Önceki içeriği temizle
    
    countries.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';
        countryItem.innerHTML = `
            <span class="country-name">${country.name}</span>
            <span class="country-code">${country.code}</span>
        `;
        
        // Tıklandığında ülke kodunu input'a ekle
        countryItem.addEventListener('click', () => {
            addCountryToInput(country.code);
        });
        
        countryGrid.appendChild(countryItem);
    });
}

// Ülke kodunu input alanına ekle
function addCountryToInput(countryCode) {
    const input = document.getElementById('countryCodes');
    const currentValue = input.value.trim();
    
    if (currentValue === '') {
        input.value = countryCode;
    } else if (!currentValue.includes(countryCode)) {
        input.value = currentValue + '-' + countryCode;
    }
    
    // Input'a odaklan
    input.focus();
}

// DOM yüklendiğinde çalışacak olay dinleyici
document.addEventListener('DOMContentLoaded', () => {
    const countryCodesInput = document.getElementById('countryCodes');
    const showRouteBtn = document.getElementById('showRouteBtn');

    // Ülke kodlarını yükle
    loadCountries();

    showRouteBtn.addEventListener('click', async () => {
        const countryCodes = countryCodesInput.value.trim();
        showErrorMessage(''); // Önceki hataları temizle

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
                // Backend'den gelen hata mesajlarını göster
                showErrorMessage(data.error || 'Bir hata oluştu.');
            }
        } catch (error) {
            console.error('API isteği sırasında hata:', error);
            showErrorMessage('Sunucuya bağlanılamadı veya beklenmeyen bir hata oluştu.');
        }
    });

    // Enter tuşu ile rota göster
    countryCodesInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            showRouteBtn.click();
        }
    });
});