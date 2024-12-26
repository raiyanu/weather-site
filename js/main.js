import Weather from "./weather.js";
const weather = new Weather();

weather.test();

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