import { useState, ChangeEvent, FormEvent } from "react";
import { countries } from "../../data/countries.ts";
import type { SearchType } from "../../types/index.ts";
import Alert from "../Alert/Alert.tsx";
import style from "./Form.module.css";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    setAlert("");
    fetchWeather(search);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {alert && (
        <p>
          <Alert>{alert}</Alert>
        </p>
      )}
      <div className={style.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          id="city"
          type="text"
          name="city"
          value={search.city}
          placeholder="Ciudad"
          onChange={handleChange}
        />
      </div>
      <div className={style.field}>
        <label htmlFor="country">País</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">Seleccione...</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          className={style.submit}
          type="submit"
          value={"consultar clima"}
        />
      </div>
    </form>
  );
}

export default Form;
