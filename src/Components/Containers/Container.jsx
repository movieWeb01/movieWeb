import React, { useState, useEffect } from "react";
import "./Container.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Container({ posts }) {
  const [topRated, setTopRated] = useState([]); 
  const [upComing, setUpComing] = useState([]); 
  const [favorite, setFavorite] = useState(() => JSON.parse(localStorage.getItem("favorite")) || []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite)); 
  }, [favorite]);

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

  const heartholder = document.getElementsByClassName("heart_img"); 

  function heartFunction(movieId) {
    if (favorite.includes(movieId)) {
      setFavorite(favorite.filter(id => id !== movieId));
    } else {
      setFavorite([...favorite, movieId]); 
    }
    localStorage.setItem("favorite", favorite); 
  }

  return (
    <div>
      <Link to={`/movies/top_rated`} style={{ textDecoration: "none", color: "#fff" }}>
        <h1 className="slider_title">Top-rated</h1>
      </Link>
      
      <div id="slider1">
        <div
          onMouseOver={pauseSlider}
          onMouseOut={runSlider}
          className="photobanner"
        >
          {topRated.map((post) => (
            <Link
              to={`/movie/${post.id}`}
              className="sliderbox"
            >
              <a
                key={post.index}
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto"}}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">
                  {`${post.original_title}`}
                  {post.vote_average !== 0 && ` - ${post.vote_average}`}
                </p>
              </a>
            </Link>
          ))}
          {topRated.map((post) => (
            <Link
              to={`/movie/${post.id}`}
              className="sliderbox"
            >
              <a
                key={post.index + 20}
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto"}}
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  className="sliderimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">
                  {`${post.original_title}`}
                  {post.vote_average !== 0 && ` - ${post.vote_average}`}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
      
      <Link to={`/movies/upcoming`} style={{ textDecoration: "none", color: "#fff" }}>
      <h1 className="slider_title">Upcoming</h1>
      </Link>
      <div>
        <div className="flex-parent">
          {upComing.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                target="_blank"
                style={{ textDecoration: "none", color: "#fff", fontFamily: "Roboto" }}
              >
                <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${post.vote_average})`}
                </div>
              </a>
            </Link>
            <Link>
              <button className='heart_btn' onClick={() => heartFunction(post.id)}>
                  <img
                    className="heart_img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                  />
                  {favorite.includes(post.id) ? 'Remove from favorite' : 'Add to favorite'}
              </button>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Container;
