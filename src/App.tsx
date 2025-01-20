import useWeather from "./hooks/useWeather.ts";
import Form from "./components/Form/Form.tsx";
import style from "./App.module.css";
import WeatherData from "./components/WeatherDetail/WeatherDetail.tsx";
import Spinner from "./components/Spinner/Spinner.tsx";
import Alert from "./components/Alert/Alert.tsx";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } =
    useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {!loading && hasWeatherData && <WeatherData weather={weather} />}
        {!loading && notFound && <Alert>La ciudad no se encontró</Alert>}
      </div>
    </>
  );
}

export default App;
