const apiKey = "088410c5d5d2e6d6b34af6ad104e483b"; 

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            resultDiv.innerHTML = `<p style="color: red;">City not found!</p>`;
        } else {
            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡️ Temperature: <strong>${data.main.temp}°C</strong></p>
                <p>☁️ Weather: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = `<p style="color: red;">Error fetching data. Check console.</p>`;
    }
}