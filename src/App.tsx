import useWeather from "./hooks/useWeather.ts";
import Form from "./components/Form/Form.tsx";
import style from "./App.module.css";
import WeatherData from "./components/WeatherDetail/WeatherDetail.tsx";
import Spinner from "./components/Spinner/Spinner.tsx";

function App() {
  const { weather, loading, fetchWeather, hasWeatherData } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {!loading && hasWeatherData && <WeatherData weather={weather} />}
      </div>
    </>
  );
}

export default App;
