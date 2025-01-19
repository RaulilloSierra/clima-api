import axios from "axios";
import { object, string, number, InferOutput, parse } from "valibot";
import { SearchType } from "../types";

// Castear Valibot
const weatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),
    humidity: number(),
  }),
});

type Weather = InferOutput<typeof weatherSchema>;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const { data } = await axios.get(geoURL);
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;
      
      // Valibot
      const { data: weatherResult } = await axios(weatherURL);
      const result = parse(weatherSchema, weatherResult);
      if(result) {
        console.log(result.name);
        console.log(result.main.temp);
      }else{
        console.log('No hay informacion...');
      }

    } catch (error) {
      console.log('oh', error);
    }
  };
  return {
    fetchWeather,
  };
}
