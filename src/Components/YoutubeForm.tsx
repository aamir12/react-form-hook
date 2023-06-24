import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YouTubeForm = () => {
  //   const form = useForm<FormValues>();

  //set Default value; we don't need to specify type "FormValues" it is optional while setting default value

  const form = useForm<FormValues>({
    defaultValues: {
      username: "aamir",
      email: "aamir@gmail.com",
      channel: "test",
    },
  });

  //we can also set data by calling api
  //   const form = useForm<FormValues>({
  //     defaultValues: async () => {
  //       const response = await fetch(
  //         `https://jsonplaceholder.typicode.com/users/1`
  //       );
  //       const data = await response.json();
  //       return {
  //         username: "aamir",
  //         email: data.email,
  //         channel: "test",
  //       };
  //     },
  //   });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  //Here is list of all method and property that what exactly "register" method returns us
  //const {name, onBlur, onChange, ref}  = register("username");
  const onSubmit = (data: FormValues) => {
    console.log("formData", data);
  };
  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
