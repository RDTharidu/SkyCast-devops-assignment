const apiKey = "088410c5d5d2e6d6b34af6ad104e483b"; 


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchLocationWeather(lat, lon);
            },
            (err) => {
                console.log("Location access denied or error.");
               
            }
        );
    }
});


function fetchLocationWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(() => {
            console.error("Error fetching location weather");
        });
}


async function checkWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (response.status == 404) {
            document.getElementById("weatherResult").innerHTML = "<p style='color:red;'>City not found!</p>";
        } else {
            const data = await response.json();
            displayWeather(data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

   
    weatherResult.innerHTML = `
        <div class="weather-box">
            <h2 class="city">${data.name}</h2>
            <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
            <div class="details">
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} km/h</p>
                <p>Condition: ${data.weather[0].main}</p>
            </div>
            <p>Updated at: ${timeString}</p>
        </div>
    `;

   
    const dateTimeDiv = document.getElementById("dateTime");
    if(dateTimeDiv) {
        dateTimeDiv.innerText = now.toDateString() + " | " + timeString;
    }
}

document.querySelector(".search-box button").addEventListener("click", () => {
    checkWeather();
});


document.getElementById("cityInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather();
    }
});

