import { Formik } from "formik"
import * as yup from "yup"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setUser, setToken} from "../States/slice.js";
import Register from "../Components/Register";

function Login() {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const registerSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    name: yup.string().required("Required"),
  });

  const initialValuesLogin = {
    email: "",
    password: ""
  }

  const initialValuesRegister = {
    email: "",
    password: "",
    name: ""
  }

  async function handleRegister(values, onSubmitProps) {

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const registeredUser = await response.json();
    console.log("Registered User: ", registeredUser);

    onSubmitProps.resetForm();
    if (registeredUser) {
      setPageType("login");
    }
  };

  async function handleLogin(values, onSubmitProps) {
    console.log("Login function");
    console.log("Login values",values);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    });

    const loginUser = await response.json();
    console.log("Login user: ",loginUser);
    console.log("USER: ",loginUser.user);
    console.log("TOKEN: ",loginUser.token);
    dispatch(setUser(loginUser.user));
    dispatch(setToken(loginUser.token));
    onSubmitProps.resetForm();
    if (loginUser) {
      navigate("/home");
    }
  };

  async function handleFormSubmit(values, onSubmitProps) {
    if (isLogin) {
      await handleLogin(values, onSubmitProps);
    } else {
      await handleRegister(values, onSubmitProps);
    }
  }

  return (
    <div>Login
      <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin : initialValuesRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <Register values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange} />
            )}
            <div>
              <input placeholder="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                type="email" />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                type="password" />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
            <p
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up!"
                : "Already have an account? Sign in!"}
            </p>
          </form>
        )
        }
      </Formik>
    </div>
  )
}

export default Login