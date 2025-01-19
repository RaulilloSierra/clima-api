import useWeather from "./hooks/useWeather.ts";
import Form from "./components/Form/Form.tsx";
import style from "./App.module.css";
import WeatherData from "./components/WeatherDetail/WeatherDetail.tsx";

function App() {
  const { weather, fetchWeather, hasWeatherData } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {hasWeatherData && <WeatherData weather={weather} />}
      </div>
    </>
  );
}

export default App;
