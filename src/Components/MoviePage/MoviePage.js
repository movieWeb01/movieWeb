import React, { useEffect, useState } from "react";
import "./MoviePage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const MoviePage = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

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

  return (
    <div>
      <h1 className="slider_title">{type.toLocaleUpperCase()}</h1>
      <div>
        <div className="flex-parent">
          {movieList.map((post) => (
            <Link className="moviebox" to={`/movie/${post.id}`}>
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
                  {post.vote_average !== 0 && ` - ${post.vote_average}`}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
