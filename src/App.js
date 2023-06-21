import "./App.css";
import { Routes, Route } from "react-router-dom";
import Example from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Description from "./Components/Des/Des";
import axios from "axios";
import { useState, useEffect } from "react";
import MoviePage from "./Components/MoviePage/MoviePage";
import GenresPage from "./Components/GenresPage/GenresPage";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7`
      )
      .then((res) => {
        console.log(res);
        setPosts(res.data.results);
        console.log("post", posts);
      });
  }, []);
  return (
    <div className="App">
      <Example />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/movies/:type" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<Description />} />
        <Route
          path="/moviesGenres/:genres"
          element={<GenresPage posts={posts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
