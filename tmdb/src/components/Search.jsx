import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import Header from "../commons/Header";
import SearchCard from "../commons/SearchCard";
import Navbar from "../commons/Navbar";

const Search = () => {
  const search = useSelector((state) => state.search);
  const location = useLocation();
  useEffect(() => {
    document.body.classList.toggle("main", location.pathname === "/search");
    return () => {
      document.body.classList.remove("main");
    };
  }, []);
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchTvShow, setSearchTvShow] = useState([]);
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer c21cca991df98a89f66c8fa895934965",
    },
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${
          search.movieResult || ""
        }`,
        options
      )
      .then((response) => {
        setSearchMovie(response.data.results);
      })
      .catch((err) => console.error(err));
  }, [search.movieResult]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?query=${search.tvResult || ""}`,
        options
      )
      .then((response) => setSearchTvShow(response.data.results))
      .catch((err) => console.error(err));
  }, [search.tvResult]);
  return (
    <>
      <Navbar />
      <Header title={`Movies found for: ${search.movieResult || "..."}`} />
      <SearchCard search={searchMovie} />
      {searchTvShow.length ? (
        <Header title={`Tv Shows found for: ${search.tvResult || "..."}`} />
      ) : (
        ""
      )}{" "}
      <SearchCard search={searchTvShow} />
    </>
  );
};

export default Search;
