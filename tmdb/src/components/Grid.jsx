import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "../commons/Slider";
import Header from "../commons/Header";
import SlidePeople from "../commons/SliderPeople";

const Grid = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer c21cca991df98a89f66c8fa895934965",
    },
  };
  const requestToAPI = (url, options, setData) => {
    axios
      .get(url, options)
      .then((response) =>
        setData((prevResults) => [...prevResults, ...response.data.results])
      )
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/movie/day?&page=1",
      options,
      setTrendingMovies
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/movie/day?&page=2",
      options,
      setTrendingMovies
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/tv/day?&page=1",
      options,
      setTrendingTvShows
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/trending/tv/day?&page=2",
      options,
      setTrendingTvShows
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`,
      options,
      setPopularPeople
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      `https://api.themoviedb.org/3/person/popular?language=en-US&page=2`,
      options,
      setPopularPeople
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/tv/airing_today?&page=1",
      options,
      setAiringToday
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/tv/airing_today?&page=2",
      options,
      setAiringToday
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=28&page=1",
      options,
      setActionMovies
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=28&page=2",
      options,
      setActionMovies
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=16&page=1",
      options,
      setAnimationMovies
    );
  }, []);
  useEffect(() => {
    requestToAPI(
      "https://api.themoviedb.org/3/discover/movie?&with_genres=16&page=2",
      options,
      setAnimationMovies
    );
  }, []);

  return (
    <div>
      <Header title={"Trending Movies"} />
      <Slider content={trendingMovies} />
      <Header title={"Most watched Tv Shows"} />
      <Slider content={trendingTvShows} />
      <Header title={"Popular people"} />
      <SlidePeople content={popularPeople} />
      <Header title={"Tv Shows Airing Today"} />
      <Slider content={airingToday} />
      <Header title={"Action Movies"} />
      <Slider content={actionMovies} />
      <Header title={"Animation Movies"} />
      <Slider content={animationMovies} />
    </div>
  );
};

export default Grid;
