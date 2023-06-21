import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer"; 

const MoviePage = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams(); 
  const [favorite, setFavorite] = useState(() => JSON.parse(localStorage.getItem("favorite")) || []);

  useEffect(() => { 
    localStorage.setItem("favorite", JSON.stringify(favorite)); 
  }, [favorite]);

  useEffect(() => { 
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setMovieList(res.data.results);
      });
  }, [type]); 

  function heartFunction(movieId) {
    if (favorite.includes(movieId)) {
      setFavorite(favorite.filter(id => id !== movieId));
    } else {
      setFavorite([...favorite, movieId]); 
    }
    localStorage.setItem("favorite", JSON.stringify([...favorite, movieId])); 
  }

  return (
    <div>
      <h1 className="slider_title">{type.charAt(0).toUpperCase() + type.slice(1).replace("_", "-")}</h1>
      <div>
        <div className="flex-parent">
          {movieList.map((post) => (
            <div className="moviebox">
            <Link to={`/movie/${post.id}`} style={{ textDecoration: "none" }}>
              <a
                style={{ textDecoration: "none", color: "#fff" }}
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">
                  {`${post.original_title}`}
                </p>
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
                {favorite.includes(post.id) ? 
                <img
                  className="heart_img"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                />
                 : <img
                 className="heart_img_black"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
               />}
            </button>
          </Link>
          </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
