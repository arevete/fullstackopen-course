import { useEffect, useState } from "react"
import WeatherService from "../services/weather"

const iconLogo = 'https://openweathermap.org/payload/api/media/file/'

const SingleCountry = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        WeatherService
            .getWeather(country.capital[0])
            .then(data =>{
                setWeather(data)
                console.log(data)
            })
    }, [country.capital])

    if (!weather) {
        return <div>Loading weather...</div>
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Idiomas</h2>
            <ul>
                {Object.entries(country.languages).map(([code, lang]) => 
                    <li key={code}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />

            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature {weather.main.temp}° Celsius</p>
                <img src={iconLogo + weather.weather[0].icon + '.png'} alt={weather.weather[0].description} />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
}

export default SingleCountry
