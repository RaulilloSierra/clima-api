import useWeather from "./hooks/useWeather.ts";
import Form from "./components/Form/Form.tsx";
import style from "./App.module.css";

function App() {
  const { fetchWeather } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        <p>2</p>
      </div>
    </>
  );
}

export default App;
