import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  FirstName: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]{3,20}$/, "❌ FirstName should be at least 3-20 alphabets only"),
  LastName: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]{1,20}$/, "❌ LastName should be at least 1-20 alphabets only"),
  DOB: yup.string().required(),
  Gender: yup.string().required(),
  Email: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "❌ Please enter a valid Email-Id"
    ),
  Phone: yup.string().required().matches(/^[0-9]{10}$/, "❌ Please enter a valid Phone Number"),
  Password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})[A-Za-z0-9!@#$%^&*]+$/,
      "❌ Password should contain at least one uppercase letter, lowercase letter, digit, special character, and a minimum length of 8 characters."
    ),
  ConformPassword: yup.string().required().oneOf([yup.ref("Password")], "❌ Password does not match"),
});

const errorBorderStyle = {
  border: "2px solid red",
};

export default function App() {
  const today = new Date().toISOString().substr(0, 10);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("✅ SignUp Form Submitted Successfully.");
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center mb-4">SignUp Form</h2>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">
                First Name
              </label>
              <input
                id="FirstName"
                {...register("FirstName")}
                className={`form-control ${errors.FirstName ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.FirstName?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">
                Last Name
              </label>
              <input
                id="LastName"
                {...register("LastName")}
                className={`form-control ${errors.LastName ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.LastName?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="DOB" className="form-label">
                Date Of Birth
              </label>
              <input
                id="DOB"
                type="date"
                {...register("DOB")}
                className={`form-control ${errors.DOB ? "is-invalid" : ""}`}
                max={today}
              />
              <p className="invalid-feedback">{errors.DOB?.message}</p>
            </div>

            <div className="mb-3">
  <label htmlFor="Gender" className="form-label">
    Gender
  </label>
  <select
    id="Gender"
    {...register("Gender", {
      required: true, // Require a selection
      validate: (value) => value !== "" || "❌ Please select a gender.", // Custom validation message
    })}
    defaultValue="" // Set an empty default value
    className={`form-select ${
      errors.Gender ? "is-invalid" : ""
    }`}
  >
    <option value="" disabled>
      Select any one
    </option>
    <option value="Female">Female</option>
    <option value="Male">Male</option>
    <option value="Other">Other</option>
  </select>
  <p className="invalid-feedback">{errors.Gender?.message}</p>
</div>


            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email-Id
              </label>
              <input
                id="Email"
                type="text"
                {...register("Email")}
                className={`form-control ${errors.Email ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.Email?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">
                Phone number
              </label>
              <input
                id="Phone"
                type="text"
                {...register("Phone")}
                className={`form-control ${errors.Phone ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.Phone?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                id="Password"
                type="password"
                {...register("Password")}
                className={`form-control ${errors.Password ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.Password?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="ConformPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="ConformPassword"
                type="password"
                {...register("ConformPassword")}
                className={`form-control ${errors.ConformPassword ? "is-invalid" : ""}`}
              />
              <p className="invalid-feedback">{errors.ConformPassword?.message}</p>
            </div>

            <div className="d-grid">
              <button
                id="submit"
                className="btn btn-dark btn-lg fw-bolder"
                type="submit"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
