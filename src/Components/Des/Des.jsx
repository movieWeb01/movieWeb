import React, { useState, useEffect } from "react";
import "./Des.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Description = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieTrailer, setmovieTrailer] = useState({});
  const rate = Math.floor(`${movieDetails.vote_average}` * 10) / 10;
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        setmovieTrailer(res.data);
      });
  }, [movieId]);
  console.log("movieTailer", movieTrailer);

  return (
    <div className="backdrop">
      <div className="mbackground">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
          style={{ width: "100%" }}
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
          <div className="filmAndRate">
            <p class="des-title">{movieDetails.title}</p>
            <span id="rate">{rate}</span>
            {/* <span>{movieDetails.production_countries[0].name}</span> */}
          </div>
          <span id="releaseDate">Release Date:{movieDetails.release_date}</span>
          <div class="des-genres">
            {movieDetails.genres?.map((ge) => (
              <Link
                to={`/moviesGenres/${ge.id}`}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <span id="genres">{ge.name}</span>
              </Link>
            ))}
          </div>
          <span id="tagline">{movieDetails.tagline}</span>
          <p className="des-info">MOVIE INFO</p>
          <p class="overview">{movieDetails.overview}</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movieTrailer.results?.[0]?.key}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div class="des-flex">
            <button className="des-button" onClick={() => navigate(-2)}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
