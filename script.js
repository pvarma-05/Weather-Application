const apiKey = '1b3078d4b9msh717c28a9674364ap128691jsncc669b923bc0';
const apiHost = 'weather-api138.p.rapidapi.com';

const updateWeatherDetails = (data) => {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = (data.main.temp - 273.15).toFixed(2);
    document.getElementById('weather').innerText = data.weather[0].main;
    document.getElementById('min_temp').innerText = (data.main.temp_min - 273.15).toFixed(2) + '℃';
    document.getElementById('max_temp').innerText = (data.main.temp_max - 273.15).toFixed(2) + '℃';
    document.getElementById('wind_speed').innerText = (data.wind.speed * 3.6).toFixed(2);
    document.getElementById('wind_deg').innerText = data.wind.deg + '°';
    document.getElementById('feels_like').innerText = (data.main.feels_like - 273.15).toFixed(2) + '℃';
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('sunrise').innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('country').innerText = data.sys.country;
    document.getElementById('timezone').innerText = data.timezone / 3600 + ' hours';
};

const fetchWeather = (city) => {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.cod && data.cod !== 200) {
                alert('City not found. Please enter a valid city name.');
            } else {
                updateWeatherDetails(data);
            }
        })
        .catch(err => console.error('Error fetching weather data:', err));
};

const updateWeatherTable = (data, city) => {
    const tableBody = document.getElementById("weatherTableBody");

    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row" class="text-start">${city}</th>
        <td>${(data.main.temp - 273.15).toFixed(2)}</td>
        <td>${(data.main.temp_min - 273.15).toFixed(2)}</td>
        <td>${(data.main.temp_max - 273.15).toFixed(2)}</td>
        <td>${data.main.humidity}</td>
        <td>${(data.wind.speed * 3.6).toFixed(2)}</td>
        <td>${data.wind.deg}</td>
        <td>${data.sys.country}</td>
        <td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
        <td>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
        <td>${data.timezone / 3600} hours</td>
    `;
    tableBody.appendChild(row);
};

const getWeatherForCommonPlaces = () => {
    const commonPlaces = [
        'Visakhapatnam',
        'Kolkata',
        'Boston'
    ];

    commonPlaces.forEach(city => {
        const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.cod && data.cod !== 200) {
                    console.error(`Error fetching weather data for ${city}: ${data.message}`);
                } else {
                    updateWeatherTable(data, city);
                }
            })
            .catch(err => console.error(`Error fetching weather data for ${city}:`, err));
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getWeatherForCommonPlaces();

    document.getElementById('submit').addEventListener('click', (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;
        fetchWeather(city);
    });
});