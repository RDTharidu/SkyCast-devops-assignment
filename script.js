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
            
            const roundedTemp = Math.round(data.main.temp);

            
            resultDiv.innerHTML = `
                <h2>📍 ${data.name}, ${data.sys.country}</h2>
                
                <div class="temp-big">${roundedTemp}°C</div>
                
                <p class="desc">☁️ ${data.weather[0].description}</p>
                
                <div class="details-box">
                    <div>
                        <p>💧 Humidity</p>
                        <strong>${data.main.humidity}%</strong>
                    </div>
                    <div>
                        <p>🌬️ Wind Speed</p>
                        <strong>${data.wind.speed} m/s</strong>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = `<p style="color: red;">Error fetching data.</p>`;
    }
}