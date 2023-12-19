import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import SingleMovieCard from "../commons/SingleMovieCard";

const Movie = () => {
  //styles
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    location.pathname === `/${params.media_type}/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  console.log("parametros", params);
  return (
    <>
      <SingleMovieCard />
    </>
  );
};

export default Movie;
