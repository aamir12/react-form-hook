import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
};

export const YouTubeForm = () => {
  //   const form = useForm<FormValues>();

  //set Default value; we don't need to specify type "FormValues" it is optional while setting default value

  const form = useForm<FormValues>({
    defaultValues: {
      username: "aamir",
      email: "aamir@gmail.com",
      channel: "test",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const { errors } = formState;

  console.log(errors);
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

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
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

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
