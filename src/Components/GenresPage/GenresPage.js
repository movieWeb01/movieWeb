import React, { useState, useEffect } from "react";
import "./GenresPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const GenresPage = ({ moviesGenres }) => {
  const { genres } = useParams();
  const [genreMovies, setGenreMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        setGenreMovies(res.data.results);
      });
  }, [genres]);
  console.log("genreMovies", genreMovies);

  return (
    <div>
      <h1 className="slider_title">{moviesGenres.name}</h1>
      <div>
        <div className="flex-parent">
          {genreMovies.map((post) => (
            <Link className="moviebox" to={`/movie/${post.id}`} key={post.id}>
              <a
                style={{ textDecoration: "none", color: "#fff" }}
                href={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                target="_blank"
              >
                <img
                  alt=""
                  className="movieimg"
                  src={`https://image.tmdb.org/t/p/original/${post.poster_path}`}
                />
                <p className="caption">{`${post.original_title}`}</p>
                <div className="star-rating">
                  {post.vote_average >= 2 ? (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 4 ? (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 6 ? (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 8 ? (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average >= 10 ? (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.svg"
                    />
                  ) : (
                    <img
                      alt=""
                      width="20px"
                      src="https://img.uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-full-icon.svg"
                    />
                  )}
                  {post.vote_average !== 0 && ` (${post.vote_average})`}
                  <button type="button" className="heart_btn">
                    <img
                      alt=""
                      className="heart_img"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                    />
                  </button>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
