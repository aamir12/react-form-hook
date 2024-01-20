import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";

interface IFormInputs {
  name: string;
  showAge: boolean;
  age: number;
}

function App() {
  const {
    register,
    watch,
    setError,
    formState: { errors, isSubmitted, touchedFields },
    handleSubmit,
    clearErrors,
  } = useForm<IFormInputs>();
  const watchShowAge = watch("showAge");

  React.useEffect(() => {
    clearErrors("age");
    if (watchShowAge) {
      setError("age", {
        types: {
          required: true,
        },
      });
    }
  }, [watchShowAge]);

  const onSubmit = (data: IFormInputs) => {
    alert(JSON.stringify(data));
  };

  console.log(touchedFields);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: true, maxLength: 50 })}
        />
        {errors.name && (
          <p>{"The Name Field is Required and must be > 49 characters"}</p>
        )}
        <label>Show Age</label>
        <input type="checkbox" {...register("showAge")} />

        <label>Age</label>
        <input type="number" {...register("age")} />
        {(isSubmitted || touchedFields["age"]) && errors.age && (
          <p>{"The number must be greater then 49"}</p>
        )}

        <input type="submit" />
      </form>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
