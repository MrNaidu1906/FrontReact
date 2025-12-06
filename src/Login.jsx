import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./Store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(loginUser(data));

    if (response.payload?.success) {
      toast.success("Login Successful!");
    } else {
      toast.error(response.payload?.message || "Login Failed");
    }
  };

  return (
    <div className="register-container">
        
      <ToastContainer />

      <form className="register-box" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Enter Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="error">{errors.username.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
