import axios from "axios";
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city) => {
    const request = axios.get(`${geoUrl}?q=${city}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
    return request.then(response => {
        const {lat, lon} = response.data[0]
        const weatherRequest = axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`)
        return weatherRequest.then(response => response.data)
    })
}

export default { getWeather }