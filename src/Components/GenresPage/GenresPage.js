import React from "react";
import "./GenresPage.css";
import { Link, useParams } from "react-router-dom";

const GenresPage = ({ posts }) => {
  const { genres } = useParams();
  return (
    <div>
      <h1 className="slider_title">Searching Results</h1>
      <div>
        <div className="flex-parent">
          {posts.map((post) =>
            post.genre_ids.includes(+genres) ? (
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
                    <button type="button" className="heart_btn">
                      <img
                        className="heart_img"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/968px-Love_Heart_SVG.svg.png"
                      />
                    </button>
                  </div>
                </a>
              </Link>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
