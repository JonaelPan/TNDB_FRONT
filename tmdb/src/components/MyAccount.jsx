import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCardGrid from "../commons/MovieCardGrid";

const Account = () => {
  const user = useSelector((state) => state.user);
  const [switchTabs, setSwitchTabs] = useState(1);
  const [favouriteMovies, setFavouriteMovies] = useState();
  const favouriteMoviesArray = [];
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer c21cca991df98a89f66c8fa895934965",
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/favourites/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        res.data.length &&
          res.data.map((element) => {
            axios
              .get(`https://api.themoviedb.org/3/movie/${element}`, options)
              .then((movie) => favouriteMoviesArray.push(movie.data))
              .catch((err) => console.error(err));
          });
      })
      .then(() => setFavouriteMovies(favouriteMoviesArray))
      .catch((err) => console.error(err));
  }, [user]);
  return (
    <div className="account-container">
      <div className="account-content-container">
        <aside className="side-bar-my-account">
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(1);
            }}
          >
            <h2 className="h2-text-tab">Personal Information</h2>
          </button>
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(2);
            }}
          >
            <h2 className="h2-text-tab">Favourite content</h2>
          </button>
          <button
            className="button-tab my-account"
            onClick={() => {
              setSwitchTabs(3);
            }}
          >
            <h2 className="h2-text-tab">Watchlist</h2>
          </button>
        </aside>
        <div
          className="personal-information-container"
          style={{ display: switchTabs === 1 ? `flex` : `none` }}
        >
          <div className="inner-container">
            <div className="img-container">
              <button className="edit-info-button">Editar informacion</button>
            </div>
            <div className="personal-data">
              <form action="submit">
                <h3>Nombre</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.name}
                />
                <h3>Apellido</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.last_name}
                />
                <h3>Email</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={user.email}
                />
                <h3>Contraseña</h3>
                <input
                  type="text"
                  className="personal-info-input"
                  value={"**********"}
                />
              </form>
            </div>
          </div>
        </div>
        <div
          className="favourites-container"
          style={{ display: switchTabs === 2 ? `flex` : `none` }}
        >
          <div className="favourite-movies">
            <div className="h1-favourite-title-container">
              <h1 className="h1-favourite-title">
                <span id="span1">Your </span>favourite{" "}
                <span id="span2">content</span>
              </h1>
            </div>
            <MovieCardGrid movies={favouriteMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
