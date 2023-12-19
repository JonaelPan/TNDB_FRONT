import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Grid from "./Grid";
import Navbar from "../commons/Navbar";

const Main = () => {
  const location = useLocation();
  //styles
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/main");
    return () => {
      document.body.classList.remove("main");
    };
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Grid />
    </>
  );
};

export default Main;
