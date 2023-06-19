import React from "react";
import Example from "./Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Carousel1 from "./Carousel1/Carousel1";
import Container from "./Containers/Container";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
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
      <Carousel1 posts={posts} />
      <Container posts={posts} />
    </div>
  );
}

export default Home;
