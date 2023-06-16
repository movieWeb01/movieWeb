
import './App.css';
import Example from './Navbar/Navbar';
import axios from "axios";
import { useState, useEffect } from "react";
import Carousel1 from "./Componetns/Carousel1";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


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
      });
  }, []);

  console.log("post", posts);
  return (
    <div className="App">

      <Example />
      hello world
      <Carousel1 posts={posts} />
    </div>
  );
}

export default App;
