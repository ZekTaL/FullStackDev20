import React, {useState, useEffect} from 'react'
import axios from 'axios'

const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY
let compassSector = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']

const Weather = ({capital}) => {

    const [weather, SetWeather] = useState([])

    useEffect(() => {     
        axios      
            .get('http://api.openweathermap.org/data/2.5/weather?q=' + capital + '&appid=' + weatherApiKey + '&units=metric')   
            .then(response => {SetWeather(response.data)})
      }, [capital])  



    if (weather.length === 0)
    {
        return (<div></div>)
    }
    else
    {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <ul>
                    <img src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} alt='' />
                    <li>{weather.weather[0].description}</li>
                    <li>temperature: {weather.main.temp} °C</li>
                    <li>wind: {weather.wind.speed} km/h, direction {compassSector[(weather.wind.deg / 22.5).toFixed(0)]}</li>
                </ul>            
            </div>
        )
    }        
}

export default Weather