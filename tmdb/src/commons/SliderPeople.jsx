import React from "react";

import { Link } from "react-router-dom";

const SliderPeople = ({ content }) => {
  return (
    <>
      {content.map((cont, i) => (
        <div className="slide-people" key={i}>
          <Link to={`/actor/single/${cont.id}`}>
            <div className="img-container-people">
              <img
                src={`https://image.tmdb.org/t/p/w500/${cont.profile_path}`}
                alt={cont.name}
                className="img-front-people"
              />
              <div className="actor-name">
                <p className="p-actor-name" style={{ color: "black" }}>
                  {cont.name}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default SliderPeople;
