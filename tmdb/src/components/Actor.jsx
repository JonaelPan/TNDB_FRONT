import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import SingleActorCard from "../commons/SingleActorCard";

const Actor = () => {
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    location.pathname === `/actor/single/${params.id}` &&
      document.body.classList.add("single-movie");
    return () => {
      document.body.classList.remove("single-movie");
    };
  }, [location.pathname]);

  return (
    <>
      <SingleActorCard />
    </>
  );
};

export default Actor;
