import React from "react";
import "./Des.css";

const Description = ({ posts }) => {
  return (
    <div class="backdrop">
      <div class="mbackground">
        <img
          src={`https://image.tmdb.org/t/p/original/${posts[0].backdrop_path}`}
          style={{ width: "100vw" }}
          alt="filmBackground"
        />
      </div>
      <div className="mcontent">
        <div className="mcleft">
          <img
            src={`https://image.tmdb.org/t/p/original/${posts[0].poster_path}`}
            className="poster"
            alt="poster"
          />
        </div>
        <div className="mcright">
          <h1>{posts[0].title}</h1>
          <span>Release Date:{posts[0].release_date}</span>
          <span>{posts[0].vote_average}</span>
          <p>MOVIE INFO</p>
          <p>{posts[0].overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
