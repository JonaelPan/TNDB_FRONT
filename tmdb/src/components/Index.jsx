import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  //styles
  useEffect(() => {
    document.body.classList.toggle("indexPage", location.pathname === "/");
    return () => {
      document.body.classList.remove("indexPage");
    };
  }, [location.pathname]);
  return (
    <>
      <div className="index-content">
        <h1>TMDB</h1>
        <h2>Ready to enjoy the best movies in the best site?</h2>
      </div>
      <div className="buttons">
        <Link to="/register">
          <button className="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sing Up!"
              data-title="First time?"
              className="p-index-buttons"
            ></p>
          </button>
        </Link>
        <Link to="/login">
          <button className="btn">
            <span></span>
            <p
              data-start="good luck!"
              data-text="Sign In!"
              data-title="Have an account?"
            ></p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Index;
