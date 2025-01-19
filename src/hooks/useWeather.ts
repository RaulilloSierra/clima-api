import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useMemo, useState } from "react";

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

export type Weather = z.infer<typeof WeatherSchema>;

export default function useWeather() {
  const initialState = {
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0,
    },
  };
  const [weather, setWeather] = useState<Weather>(initialState);

  const [loading, setLoading] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const { VITE_API_KEY } = import.meta.env;
    setLoading(true);
    setWeather(initialState);
    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${VITE_API_KEY}`;
      const { data } = await axios.get(geoURL);
      const { lat, lon } = data[0];
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_API_KEY}`;

      // Implementacion de Zod
      const { data: wheaterResult } = await axios(weatherURL);
      const result = WeatherSchema.safeParse(wheaterResult);
      if (result.success) {
        setWeather(result.data);
      } else {
        console.log("No se encontraron resultados");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherData,
  };
}
