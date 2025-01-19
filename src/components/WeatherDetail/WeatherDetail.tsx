import { formatTemp } from "../../helpers/index.ts";
import { Weather } from "../../hooks/useWeather.ts";
import style from "./WeatherDetail.module.css";
import min from '../../img/temp_min.svg';
import max from '../../img/temp_max.svg';
import hum from '../../img/humidity.svg';

type WeatherDetailProps = {
  weather: Weather;
};

function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={style.weatherContender}>
      <h2>{weather.name}</h2>
      <p className={style.weatherTemp}>{formatTemp(weather.main.temp)}°C</p>
      <div className={style.weatherInfo}>
        <p><img src={min} alt="temp min" />{formatTemp(weather.main.temp_min)}°C</p>
        <p><img src={max} alt="temp max" /> {formatTemp(weather.main.temp_max)}°C</p>
        <p><img src={hum} alt="humidity" />{weather.main.humidity}%</p>
      </div>
    </div>
  );
}

export default WeatherDetail;
