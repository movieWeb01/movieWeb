import React, { useState, useEffect } from "react";
import "./Des.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Description = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        setMovieDetails(res.data);
      });
  }, [movieId]);
  console.log("movieDetails", movieDetails);

  return (
    <div className="backdrop">
      <div className="mbackground">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
          style={{ width: "100vw" }}
          alt="filmBackground"
        />
      </div>
      <div className="mcontent">
        <div className="mcleft">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
            className="poster"
            alt="poster"
          />
        </div>
        <div className="mcright">
          <h1>{movieDetails.title}</h1>
          <span>Release Date:{movieDetails.release_date}</span>
          <span>{movieDetails.vote_average}</span>
          <p>MOVIE INFO</p>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Description;
