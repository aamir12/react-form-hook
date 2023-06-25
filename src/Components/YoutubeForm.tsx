import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

let renderCount = 0;
export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "aamir",
      email: "aamir@gmail.com",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 30,
      dob: new Date(),
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const {
    errors,
    isDirty,
    touchedFields,
    isValid,
    dirtyFields,
    isSubmitted,
    isSubmitting,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("formData", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    //add logic for custom errors
    console.log("Form Errors", errors);
  };

  const handleGetValue = () => {
    //get entire form value
    console.log(getValues());
    //get specific value;
    console.log(getValues("social"));
    console.log(getValues("social.facebook"));
    console.log(getValues("phNumbers.0"));
    console.log(getValues(["username", "email"]));
  };

  const handleSetValue = () => {
    //set value of field, it does not cause to make field dirty,touched and validated
    //setValue("channel", "CodexKing");

    //update state
    setValue("channel", "CodexKing", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  //isSubmitting it true while submit form and automatically become false after successfull submit
  //isSubmit is one time submit
  console.log({ isSubmitted, isSubmitting, isSubmitSuccessful, submitCount });
  // console.log({ isDirty, touchedFields, isValid, dirtyFields, isSubmitted });

  //watch is used to mointer changes of field;
  //it causes component re-render
  //it watches the changes of username
  //const watchUsername = watch("username");
  //we can also watch multiple fields
  //const watchUsernameEmail = watch(["username", "email"]);

  //Entire form watch
  //const watchForm = watch();

  //it does not cause re-render
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  renderCount++;
  return (
    <div>
      <h1>YouTube Form {renderCount / 2}</h1>
      {/* <h3>{watchUsername}</h3> */}
      {/* <h3>{watchUsernameEmail}</h3> */}
      {/* {JSON.stringify(watchForm)} */}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                noAdminEmail: (value) => {
                  return (
                    value !== "admin@example.com" || "Enter different email id"
                  );
                },
                noAllowedBadDomain: (value) => {
                  return (
                    !value.endsWith("baddomain.com") ||
                    "Bad domain email id is not alloweds"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message} </p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel name is required",
              },
            })}
          />

          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "Twitter link is required",
            })}
          />
          <p className="error">{errors?.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: "Facebook link is required",
            })}
          />
          <p className="error">{errors?.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primaryPhone">Primary Phone number</label>
          <input
            type="text"
            id="primaryPhone"
            {...register("phoneNumbers.0", {
              required: "Primary Phone is required",
            })}
          />
          <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPhone">Secondary Phone number</label>
          <input
            type="text"
            id="secondaryPhone"
            {...register("phoneNumbers.1", {
              required: "Secondary phone is required",
            })}
          />
          <p className="error">{errors?.phoneNumbers?.[1]?.message}</p>
        </div>

        {fields.map((field, index) => {
          return (
            <div className="form-control" key={field.id}>
              <label>Phone number {index + 1}</label>
              <input
                type="text"
                {...register(`phNumbers.${index}.number`, {
                  required: {
                    value: true,
                    message: `Phone number is required`,
                  },
                })}
              />

              <p className="error">
                {errors?.phNumbers?.[index]?.number?.message}
              </p>

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          );
        })}

        <button type="button" onClick={() => append({ number: "" })}>
          Add number
        </button>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age name is required",
              },
            })}
          />

          <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />

          <p className="error">{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type="button" onClick={handleGetValue}>
          Get Value
        </button>
        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
      </form>

      {/* <DevTool control={control} /> */}
    </div>
  );
};
