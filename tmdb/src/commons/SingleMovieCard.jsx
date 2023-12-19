import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleMovieCard = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [currentMovie, setCurrentMovie] = useState();
  const [existingFavourite, setExistingFavourite] =
    useState("Add to favourites");

  console.log(currentMovie);
  const handleClickFavourites = () => {
    user.email
      ? axios
          .post(
            `http://localhost:5000/api/users/favorites`,
            { email: user.email, newFavourite: currentMovie.id },
            { withCredentials: true }
          )
          .then(() => console.log("added to favorites"))
          .catch((err) => console.error("that did not go well"))
      : console.log("no email");
    setExistingFavourite("Remove from favorites");
  };
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer c21cca991df98a89f66c8fa895934965",
    },
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`,
        options
      )
      .then((response) => {
        setCurrentMovie(response.data);
      })
      .catch(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`,
            options
          )
          .then((response) => {
            setCurrentMovie(response.data);
          })
          .catch(() => {
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
                options
              )
              .then((response) => {
                setCurrentMovie(response.data);
              })
              .catch((err) => console.error(err));
          });
      });
  }, []);
  useEffect(() => {
    user.email &&
      axios
        .get(
          `http://localhost:5000/api/users/favorites/exist/${user.email}/${currentMovie?.id}`,
          {
            withCredentials: true,
          }
        )
        .then(() => setExistingFavourite("Remove from favorites"))
        .catch(() => {});
  });
  return (
    <div className="single-movie-container">
      <div class="parent-single-movie">
        <div class="div1">
          <img
            src={`https://image.tmdb.org/t/p/w500/${currentMovie?.poster_path}`}
            alt=""
          />
        </div>
        <div class="div2 smcdiv2">
          <h1>
            {currentMovie?.title}
            {currentMovie?.name}
          </h1>
          <h2>{currentMovie?.tagline}</h2>
          <h3>
            Genres: {" - "}
            {currentMovie?.genres
              ? currentMovie.genres.map((e) => e.name + " - ")
              : "no genres available"}
          </h3>
          <h3>
            Released on: {currentMovie?.release_date}{" "}
            {currentMovie?.first_air_date}
          </h3>
          <p>{currentMovie?.overview}</p>
        </div>
        <div class="div3">
          <button className="home-button" onClick={handleClickFavourites}>
            {existingFavourite}
          </button>
          <Link
            target="blank"
            to={`https://www.youtube.com/results?search_query=${
              currentMovie?.name || currentMovie?.title
            }+trailer`}
          >
            <button id="button-trailer" className="home-button">
              <p className="tag-a-trailer" style={{ margin: "unset" }}>
                Watch Trailer
              </p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleMovieCard;
