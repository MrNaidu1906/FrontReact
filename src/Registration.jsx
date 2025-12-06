import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./Store";


function Registration() {
  const dispatch = useDispatch();

  // react-hook-form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // redux state
  const { loading, error, success } = useSelector((state) => state.user);

  // submit handler
  const onSubmit = (data) => {
    dispatch(registerUser(data));
    reset();
  };

  return (
    <div>
      <h1>Registration Form</h1>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* NAME */}
        <input
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br />

        {/* USERNAME */}
        <input
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <br />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />

        {/* PHONE */}
        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit phone number" }
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
        <br />

        {/* ADDRESS */}
        <textarea
          placeholder="Full Address"
          rows="3"
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Minimum 5 characters" }
          })}
        ></textarea>
        {errors.address && <p>{errors.address.message}</p>}
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Registration;
