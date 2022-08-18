import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    // const {name,value} = e.target
    // setUser({
    // ...user,//spread operator
    // [name]:value
    // })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // alert("submit",email,password)
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://localhost:6969/Login", user).then((res) => {
      console.log("response", res);
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.data));

        navigate("/");
      }
      // alert(res.data.message);
    });
  };
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>

            <p className="forgot-password text-right mt-2">
              <a href="/Register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
