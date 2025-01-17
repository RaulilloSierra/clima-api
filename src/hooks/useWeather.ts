import axios from "axios";
import { SearchType } from "../types";

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const response = await axios.get(geoURL);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    fetchWeather,
  };
}
