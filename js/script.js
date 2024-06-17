document.addEventListener('DOMContentLoaded', () => {
    const countryContainer = document.getElementById('country-container');
    const restCountriesAPI = 'https://restcountries.com/v3.1/all';
    const weatherAPIKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    
    // Fetch data from REST Countries API
    fetch(restCountriesAPI)
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const { name, capital, region, latlng, flags, cca2 } = country;

                // Create Bootstrap card
                const card = document.createElement('div');
                card.className = 'col-lg-4 col-sm-12';
                card.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-header">
                            ${name.common}
                        </div>
                        <div class="card-body">
                            <img src="${flags[0]}" class="card-img-top" alt="Flag of ${name.common}">
                            <p><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
                            <p><strong>Region:</strong> ${region}</p>
                            <p><strong>Lat/Lng:</strong> ${latlng.join(', ')}</p>
                            <p><strong>Country Code:</strong> ${cca2}</p>
                            <button class="btn btn-primary" onclick="getWeather('${latlng[0]}', '${latlng[1]}', '${name.common}')">Get Weather</button>
                        </div>
                    </div>
                `;
                countryContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));
});

function getWeather(lat, lon, countryName) {
    const weatherAPIKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`;

    fetch(weatherAPI)
        .then(response => response.json())
        .then(weatherData => {
            alert(`Current temperature in ${countryName} is ${weatherData.main.temp}°C`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
