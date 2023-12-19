import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const initialState = { email: "", password: "", name: "", last_name: "" };
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(null);
  const [user, setUser] = useState({});
  const [inputData, setInputData] = useState(initialState);

  const inputValue = (e) => {
    const { name, value } = e.target;
    setInputData((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    axios
      .post("http://localhost:5000/api/users/register", inputData)
      .then((response) => {
        setUser(response.data);
        navigate("/login");
      })
      .catch((error) => alert(error));
    setInputData(initialState);
  };
  document.body.classList.add("loginPage");
  return (
    <>
      <div className="title-and-info-container">
        <h1 className="h1-title-login">TMDB</h1>
        <h4 className="h4-subtitle-login">- Full-Stack developer -</h4>
      </div>
      <div className="register-content-container">
        <h1>Hey, Welcome!</h1>
        <form>
          <div className="user-box">
            <input type="text" name="email" required="" onChange={inputValue} />
            <label className="placeholder-form-login">Email</label>
          </div>
          <div className="user-box">
            <input type="text" name="name" required="" onChange={inputValue} />
            <label className="placeholder-form-login">Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="last_name"
              required=""
              onChange={inputValue}
            />
            <label className="placeholder-form-login">Last name</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              required=""
              onChange={inputValue}
            />
            <label className="placeholder-form-login">Password</label>
          </div>
          <div className="user-box">
            {invalidEmail && <p>{invalidEmail}</p>}{" "}
          </div>
          <center onClick={handleSubmit}>
            <a href="/register">
              SIGN UP
              <span></span>
            </a>
          </center>
        </form>
        <h4>Already have an account?</h4>
        <a className="tag-a-register-login" href="/login">
          Sign In here!
        </a>
      </div>
    </>
  );
};

export default Login;
