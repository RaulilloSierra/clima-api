import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";

// Type Guard o assertion
// function isWeatherResult(wheater: unknown): wheater is WeatherType {
//   return (
//     Boolean(wheater) &&
//     typeof wheater === "object" &&
//     typeof (wheater as WeatherType).name === "string" &&
//     typeof (wheater as WeatherType).main.temp === "number" &&
//     typeof (wheater as WeatherType).main.temp_min === "number" &&
//     typeof (wheater as WeatherType).main.temp_max === "number" &&
//     typeof (wheater as WeatherType).main.humidity === "number"
//   );
// }

// Zod

const WeatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    humidity: z.number(),
  }),
});

type Weather = z.infer<typeof WeatherSchema>;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const { data } = await axios.get(geoURL);
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;
      // Type Guard
      // const { data: wheaterResult } = await axios(weatherURL);
      // console.log(wheaterResult);
      // const result = isWeatherResult(wheaterResult);
      // if (result) {
      //   console.log(wheaterResult.name);
      // } else {
      //   console.log("No se encontraron resultados");
      // }

      // Implementacion de Zod
      const { data: wheaterResult } = await axios(weatherURL);
      const result = WeatherSchema.safeParse(wheaterResult);
      if (result.success) {
        console.log(result.data.name);
        console.log(result.data.main.temp);
      }else{
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
