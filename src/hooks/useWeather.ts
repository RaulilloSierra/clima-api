import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const { data } = await axios.get(geoURL);
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;
      const { data: wheaterResult } = await axios.get(weatherURL);
      console.log(wheaterResult);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
