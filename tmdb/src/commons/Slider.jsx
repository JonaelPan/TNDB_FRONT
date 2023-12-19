import React from "react";
import { Link } from "react-router-dom";

const Slider = ({ content }) => {
  const truncate = (overview) => {
    return overview.slice(0, 110) + "...";
  };
  return (
    <>
      {content.map((cont, i) => (
        <div className="Slide" key={i}>
          <Link to={`/${cont.media_type}/single/${cont.id}`}>
            <div className="img-container">
              <img
                src={`https://image.tmdb.org/t/p/w500/${cont.poster_path}`}
                alt={cont.title}
                className="img-front"
              />
              <div className="img-back">
                <p>
                  {cont.overview
                    ? truncate(cont.overview)
                    : "No description available"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Slider;
