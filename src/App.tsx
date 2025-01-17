import style from "./App.module.css";
import Form from "./components/Form/Form.tsx";

function App() {
  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  );
}

export default App;
