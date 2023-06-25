import React, { useState } from "react";

import { useForm } from "react-hook-form";
import "../App.css";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function ToggleValidation() {
  const [isUsernameRequired, setIsUsernameRequired] = useState(true);
  const [isEmailPattern, setIsEmailPattern] = useState(true);
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, clearErrors } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("formData", data);
  };

  const handleToggleUsernameRequired = () => {
    const isUserFieldRequied = !isUsernameRequired;
    if (!isUserFieldRequied) {
      clearErrors("username");
    }
    setIsUsernameRequired(isUserFieldRequied);
  };

  const toggleEmailPattern = () => {
    const isPattern = !isEmailPattern;
    if (!isPattern) {
      clearErrors("email");
    }
    setIsEmailPattern(isPattern);
  };

  return (
    <div>
      <h1>Toggle Form Validation</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: isUsernameRequired ? "Username is required" : false,
              minLength: isUsernameRequired ? 3 : undefined,
            })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: isEmailPattern
                ? {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                    message: "Invalid email format",
                  }
                : undefined,
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-control">
          <label>
            <input
              type="checkbox"
              checked={isUsernameRequired}
              onChange={handleToggleUsernameRequired}
            />
            Toggle Username is required validation
          </label>
        </div>

        <div className="form-control">
          <label>
            <input
              type="checkbox"
              checked={isEmailPattern}
              onChange={toggleEmailPattern}
            />
            Toggle Email pattern
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
