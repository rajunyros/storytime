import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Register = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    // const {name,value} = e.target
    // setUser({
    // ...user,//spread operator
    // [name]:value
    // })
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   alert("submit", email, password);
  //   const user = {
  //     first_name: fname,
  //     last_name: lname,
  //     email: email,
  //     password: password,
  //   };

  //   axios.post("http://localhost:6969/Register", user).then((res) => {
  //     // alert(res.data.message);
  //     // setLoginUser(res.data.user);
  //     console.log("response", res);
  //     if (res) {
  //       navigate("/Login");
  //     }
  //     // navigate("/");
  //   });
  // };
  return (
    <>
      <div className="Auth-form-container">
        <div className="Auth-form">
          <div className="Auth-form-content">
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
              }}
              validate={(values) => {
                let errors = {};
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                if (!values.email) {
                  errors.email = "Cannot be blank";
                } else if (!regex.test(values.email)) {
                  errors.email = "Invalid email format";
                }

                if (!values.first_name) {
                  errors.first_name = "Cannot be blank";
                }
                if (!values.last_name) {
                  errors.last_name = "Cannot be blank";
                }

                if (!values.password) {
                  errors.password = "Cannot be blank";
                } else if (values.password.length < 4) {
                  errors.password = "Password must be more than 4 characters";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                // e.preventDefault();

                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  axios
                    .post("http://localhost:6969/Register", values)
                    .then((res) => {
                      // alert(res.data.message);
                      // setLoginUser(res.data.user);
                      console.log("response", res);
                      if (res) {
                        navigate("/Login");
                      }
                      // navigate("/");
                    });
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h3 className="Auth-form-title">Sign Up</h3>
                  <div className="text-center">
                    Already registered?{" "}
                    <span className="link-primary">
                      <a href="/Login">Sign In</a>
                    </span>
                  </div>
                  <div className="form-group mt-3">
                    <label>Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control mt-1"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>First Name</label>
                    <Field
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="form-control mt-1"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="first_name"
                      component="div"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>Last Name</label>

                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control mt-1"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="last_name"
                      component="div"
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control mt-1"
                    />
                    <ErrorMessage
                      className="err_msg"
                      name="password"
                      component="div"
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-center mt-2">
                    Forgot <a href="#">password?</a>
                  </p>
                </Form>
              )}
            </Formik>
            {/*            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <label>Firt Name</label>
              <input
                className="form-control mt-1"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                className="form-control mt-1"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
