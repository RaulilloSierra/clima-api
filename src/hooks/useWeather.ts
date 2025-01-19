import axios from "axios";
import { SearchType, WeatherType } from "../types";

function isWeatherResult(wheater: unknown): wheater is WeatherType {
  return (
    Boolean(wheater) &&
    typeof wheater === "object" &&
    typeof (wheater as WeatherType).name === "string" &&
    typeof (wheater as WeatherType).main.temp === "number" &&
    typeof (wheater as WeatherType).main.temp_min === "number" &&
    typeof (wheater as WeatherType).main.temp_max === "number" &&
    typeof (wheater as WeatherType).main.humidity === "number"
  );
}

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const { data } = await axios.get(geoURL);
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;
      // Type Guard
      const { data: wheaterResult } = await axios(weatherURL);
      console.log(wheaterResult);
      const result = isWeatherResult(wheaterResult);
      if (result) {
        console.log(wheaterResult.name);
      } else {
        console.log("No se encontraron resultados");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
