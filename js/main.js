import Weather from "./weather.js";
const weather = new Weather();

// weather.test();

let TempWeather = {
    "location": {
        "name": "Pernambut",
        "region": "Tamil Nadu",
        "country": "India",
        "lat": 12.9333,
        "lon": 78.7167,
        "tz_id": "Asia/Kolkata",
        "localtime_epoch": 1735219961,
        "localtime": "2024-12-26 19:02"
    },
    "current": {
        "last_updated_epoch": 1735219800,
        "last_updated": "2024-12-26 19:00",
        "temp_c": 21,
        "temp_f": 69.7,
        "is_day": 0,
        "condition": {
            "text": "Mist",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/143.png",
            "code": 1030
        },
        "wind_mph": 6.5,
        "wind_kph": 10.4,
        "wind_degree": 79,
        "wind_dir": "E",
        "pressure_mb": 1016,
        "pressure_in": 29.99,
        "precip_mm": 0.04,
        "precip_in": 0,
        "humidity": 94,
        "cloud": 87,
        "feelslike_c": 21,
        "feelslike_f": 69.7,
        "windchill_c": 21,
        "windchill_f": 69.7,
        "heatindex_c": 21,
        "heatindex_f": 69.7,
        "dewpoint_c": 20,
        "dewpoint_f": 68,
        "vis_km": 2,
        "vis_miles": 1,
        "uv": 0,
        "gust_mph": 11.9,
        "gust_kph": 19.1
    }
}

function setLoading(toTurnOn) {
    toTurnOn ? document.getElementById('loader').classList.add("show") : setTimeout(() => {
        document.getElementById('loader').classList.remove("show")
    }, 1000);
}

function showToast(message = "an error occured") {
    let helper_toast = document.getElementById('helper-toast');
    helper_toast.classList.add("show");
    helper_toast.innerHTML = message;
    setTimeout(() => {
        helper_toast.classList.remove("show");
        helper_toast.innerHTML = ""
    }, 5000);
}



export async function getWeather(location) {
    setLoading(true);
    console.log("event : ", location);
    if (location == "") {
        showToast("Please, Enter your desired city name");
        setLoading(false);
        return;
    }

    let weatherInfo;
    setLoading(true);

    try {
        weatherInfo = await weather.fetchWeather(location);
    } catch (error) {
        showToast("<em>Internal server Error </em>, try again later");
        setLoading(false);
    }
    if (!(weatherInfo.current && weatherInfo.location)) {
        showToast("<em>Internal server Error </em>, try again later or try refreshing the page");
        return;
    }

    updateUi(weatherInfo)
    setLoading(false);
}

async function getUpdatedWeatherInfo(location) {
    let weatherInfo = await weather.fetchWeather(location);
    updateUi(weatherInfo)
}

async function updateUiBasedByUserLocation() {
    let weatherInfo;
    setLoading(true);
    try {
        weatherInfo = await weather.fetchWeather(await weather.getUserCordinate());
    } catch (error) {
        setLoading(false);
    }
    if (!(weatherInfo.current && weatherInfo.location)) {
        alert("error");
    }
    console.log(weatherInfo);
    updateUi(weatherInfo);
    setLoading(false);
    // alert('success');
}

async function updateUi(weatherInfo) {

    try {
        document.getElementById("ui-celsius").innerHTML = `${Math.floor(weatherInfo.current.temp_c)}°`;
        document.getElementById("ui-word-condition").innerHTML = weatherInfo.current.condition.text;
        document.getElementById("ui-date").innerHTML = weather.formatDate(weatherInfo.current.last_updated);
        let iconSize = '128';
        document.getElementById("weather-icon-condition").src = `//cdn.weatherapi.com/weather/${iconSize}x${iconSize}/day/${weatherInfo.current.condition.icon.split('/').pop()}`;
        document.getElementById("ui-humidity").innerHTML = `${weatherInfo.current.humidity}%`;
        document.getElementById("ui-cloud-cover").innerHTML = `${weatherInfo.current.cloud}%`;
        document.getElementById("ui-wind-speed").innerHTML = `${Math.floor(weatherInfo.current.wind_mph)}mph ~ ${Math.floor(weatherInfo.current.wind_kph)}kph`;
        document.getElementById("ui-feelslike").innerHTML = `${Math.floor(weatherInfo.current.feelslike_c)}°C`;
        document.getElementById("ui-pressure").innerHTML = `${weatherInfo.current.pressure_mb} mb`;
        document.getElementById("ui-wind-gust").innerHTML = `${Math.floor(weatherInfo.current.gust_mph)}mph`;
        document.getElementById("ui-visibility").innerHTML = `${weatherInfo.current.vis_km}km`;
        document.getElementById("ui-uv-index").innerHTML = `${weatherInfo.current.uv} Low`;
        document.getElementById("current-location-text").innerHTML = `${weatherInfo.location.name}, ${weatherInfo.location.region}`;
        console.log(weatherInfo.location);

        if (weatherInfo.current.alerts && Array.isArray(weatherInfo.current.alerts) && weatherInfo.current.alerts.length > 0) {
            document.getElementById("ui-weather-alert").style.display = "block";
            document.getElementById("alert-text").innerHTML = weatherInfo.current.alerts[0].description;
        } else {
            document.getElementById("ui-weather-alert").style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }


}


window.addEventListener('DOMContentLoaded', async () => {
    // getUpdatedWeatherInfo(await weather.getUserCordinate());
    let TempWeather = {
        current: {
            "last_updated_epoch": 1735292700,
            "last_updated": "2024-12-27 15:15",
            "temp_c": 24.8,
            "temp_f": 76.7,
            "is_day": 1,
            "condition": {
                "text": "Light rain shower",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                "code": 1240
            },
            "wind_mph": 11.4,
            "wind_kph": 18.4,
            "wind_degree": 75,
            "wind_dir": "ENE",
            "pressure_mb": 1014,
            "pressure_in": 29.94,
            "precip_mm": 0.5,
            "precip_in": 0.02,
            "humidity": 80,
            "cloud": 72,
            "feelslike_c": 96.9,
            "feelslike_f": 80.4,
            "windchill_c": 24.8,
            "windchill_f": 76.7,
            "heatindex_c": 26.9,
            "heatindex_f": 80.4,
            "dewpoint_c": 21.2,
            "dewpoint_f": 70.2,
            "vis_km": 10,
            "vis_miles": 6,
            "uv": 1.5,
            "gust_mph": 16.4,
            "gust_kph": 26.4
        }
    }
    // updateUi(TempWeather);
    await updateUiBasedByUserLocation()


    document.getElementById('ui_location_input').addEventListener('input', async () => {
        console.log('hey there');
        let suggestedCity = await weather.getCitySuggestion(document.getElementById('ui_location_input').value);
        let location_suggestions_el = document.getElementById('location_suggestions');
        location_suggestions_el.innerHTML = ''
        for (const city of suggestedCity) {
            location_suggestions_el.innerHTML += `<option>${city.name}, ${city.region}</option>`;
        }
    });

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', (event) => {
        try {
            event.preventDefault();
        } catch (error) {
            // console.log(error);
        }
        getWeather(event.target.location.value);  // Pass the event object to getWeather
    });
})