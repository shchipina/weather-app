import React, { useEffect, useState } from 'react';
import styles from './WeatherApp.module.css';
import { IoSearch } from "react-icons/io5";
import { FaWater } from "react-icons/fa";
import { LuWind } from "react-icons/lu";

import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png'

const WeatherApp = () => {
  const apiKey = 'd1cca3cf78234f5b015b8846eb45fad7';
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("London");

  const search = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`);
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    search()
  }, []);

  const getImageForWeather = (condition) => {
    switch (condition) {
      case 'Clear':
        return clear;
      case 'Clouds':
        return cloud;
      case 'Drizzle':
        return drizzle;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      default:
        return cloud;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder='Search'
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className={styles.inputCity}
        />

        <div className={styles.searchIcon} onClick={() => search()}>
          <IoSearch />
        </div>
      </div>

      <div className={styles.weatherImage}>
        <img src={getImageForWeather(weather.weather && weather.weather[0].main)} alt="Weather" />
      </div>

      <p className={styles.weatherTemp}>
        {weather.main && Math.ceil(weather.main.temp)}°C
      </p>

      <p className={styles.weatherLocation}>
        {weather.name}
      </p>

      <div className={styles.dataContainer}>
        <div className={styles.element}>
          <FaWater style={{ fontSize: '40px' }} />

          <div className={styles.data}>
            <p className={styles.humidityPercent}>
              {weather.main && weather.main.humidity}%
            </p>
            <p className={styles.text}>Humidity</p>
          </div>
        </div>

        <div className={styles.element}>
          <LuWind style={{ fontSize: '40px' }} />
          <div className={styles.data}>
            <p className={styles.humidityPercent}>
              {weather.wind && weather.wind.speed} km/h
            </p>
            <p className={styles.text}>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default WeatherApp
