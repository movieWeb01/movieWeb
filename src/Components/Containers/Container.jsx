import React, { useState, useEffect } from "react";
import "./Container.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Container({ posts }) {
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpComing] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setTopRated(res.data.results);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setUpComing(res.data.results);
      });
  }, []);

  var slider1holder = document.getElementById("slider1");
  var photobannerholder = document.getElementsByClassName("photobanner")[0];
  document.documentElement.style.setProperty(
    "--bannerwidth",
    `${topRated.length * 23}vw`
  );
  var slider1holder = document.getElementById("slider2");

  function pauseSlider() {
    photobannerholder.style.animationPlayState = "paused";
  }

  function runSlider() {
    photobannerholder.style.animationPlayState = "running";
  }

  return (
    <div>
      <h1 className="slider_title">Top Rated</h1>
      <div id="slider1">
        <div
          onMouseOver={pauseSlider}
          onMouseOut={runSlider}
          className="photobanner"
        >
          {topRated.map((post) => (
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to={`/movie/${post.id}`}
            >
              <a
                className="sliderbox"
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
              </a>
            </Link>
          ))}
          {topRated.map((post) => (
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to={`/movie/${post.id}`}
            >
              <a
                className="sliderbox"
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="slider_title">Upcoming</h1>
      <div>
        <div className="flex-parent">
          {upComing.map((post) => (
            <a
              className="moviebox"
              href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
              target="_blank"
            >
              <img
                className="movieimg"
                src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
              />
              <p className="caption">
                {`${post.original_title}`}
                {post.vote_average !== 0 && ` - ${post.vote_average}`}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Container;
