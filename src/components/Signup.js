// Imports
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    axios
      .post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
      .then((response) => {
        const { token } = response.data;
        // Save token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get the user data
        const decoded = jwt_decode(token);
        // Set current user
        props.nowCurrentUser(decoded);
      })
      .catch((error) => {
        console.log(error);
        alert("Either email or password is incorrect. Please try again.");
      });
  };

  if (redirect) return <Redirect to="/login" />;

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;