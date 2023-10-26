import FlexBetween from "components/FlexBetween";
import React, { useState } from "react";
import Dropzone from "react-dropzone"; //let user drop or put the files or images so they can upload the file to backend
import { Formik } from "formik"; //form library
import * as yup from "yup"; //validation library
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { setLogin } from "state";
import { EditOutlined } from "@mui/icons-material";
import { BaseUrl } from "BaseUrl";

//Schema for forms
//Yup validatiom schema

//this checks or validates the all the fields and gives certain error message
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

//login schema
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

//inital values of the register form
const intialValuesRegister = {
  firstName: "",
  lastName: "",
  occupation: "",
  location: "",
  email: "",
  password: "",
  picture: "",
};

//intial values of the login form
const intialValuesLogin = {
  email: "",
  password: "",
};

//form comp
const Form = (props) => {
  //setting page type --> login or register
  const [pageType, setPageType] = useState(props.page || "login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  //form submit -----register
  const register = async (values, onSubmitProps) => {
    //this allows us to send Form info with images
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(BaseUrl + "auth/register", {
      method: "POST",
      body: formData,
    });
    if (!savedUserResponse.ok) {
      throw new Error("failed to Register");
    }
    const savedUser = await savedUserResponse.json();
    // console.log(savedUser);
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
      navigate("/login");
    }
  };

  //form submit ----login
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(BaseUrl + "auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // console.log(loggedInResponse);
    const loggedIn = await loggedInResponse.json();
    // console.log(loggedIn);
    if (loggedInResponse.status === 500) {
      throw new Error(loggedIn.error);
    }
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const formSumbitHandler = async (values, onSubmitProps) => {
    if (isLogin)
      await login(values, onSubmitProps).catch((error) =>
        console.log(error.message)
      );

    if (!isLogin)
      await register(values, onSubmitProps).catch((error) =>
        console.log(error.message)
      );
  };
  return (
    <>
      <Formik
        onSubmit={formSumbitHandler}
        initialValues={isLogin ? intialValuesLogin : intialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
          resetForm,
          touched,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr)"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                {isRegister && (
                  <>
                    {/* input component */}
                    <TextField
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      placeholder="firstName"
                      label="First Name"
                      //   if i toched and has error occur it shows error
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={
                        Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      placeholder="Last Name"
                      label="Last Name"
                      //   if i toched and has error occur it shows error
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
                    />
                    <TextField
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      placeholder="Location"
                      label="Location"
                      //   if i toched and has error occur it shows error
                      helperText={touched.location && errors.location}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={
                        Boolean(touched.occupation) &&
                        Boolean(errors.occupation)
                      }
                      placeholder="occupation"
                      label="Occupation"
                      //   if i toched and has error occur it shows error
                      helperText={touched.occupation && errors.occupation}
                      sx={{ gridColumn: "span 4" }}
                    />

                    {/* inputing Profile image */}
                    <Box
                      gridColumn="span 4"
                      border={`1px solid ${palette.neutral.medium}`}
                      borderRadius="5px"
                      padding="1rem"
                    >
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("picture", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`1px dashed ${palette.primary.main}`}
                            padding="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                              <p>Add picture</p>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.picture.name}</Typography>
                                <EditOutlined />
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                    </Box>

                    <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      placeholder="email"
                      //   if i toched and has error occur it shows error
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      placeholder="password"
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}

                {isLogin && (
                  <>
                    <TextField
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      placeholder="email"
                      //   if i toched and has error occur it shows error
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />

                    <TextField
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      placeholder="password"
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}

                {/* BUTTONS */}

                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": {
                        color: palette.primary.main,
                        backgroundColor: palette.primary.light,
                      },
                    }}
                  >
                    {isLogin ? "LOGIN" : "REGISTER"}
                  </Button>
                </Box>
                <Typography
                  onClick={(e) => {
                    e.preventDefault();
                    isLogin ? navigate("/register") : navigate("/login");
                  }}
                  sx={{
                    color: palette.primary.main,
                    gridColumn: "span 4",
                    "&:hover": { color: "rgba(0,0,100,1)", cursor: "pointer" },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign up here."
                    : "Already Have an Account? login here."}
                </Typography>
              </Box>
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

export default Form;
