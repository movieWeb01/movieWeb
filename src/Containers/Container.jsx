import React, { useState, useEffect } from 'react';
import './Container.css';
import axios from 'axios';

function Container({ posts }){
    const  [topRated, setTopRated] = useState([])
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
    
    var slider1holder = document.getElementById("slider1");
    var photobannerholder = document.getElementsByClassName("photobanner")[0];
    document.documentElement.style.setProperty('--bannerwidth', `${topRated.length * 23}vw`);  
    var slider1holder = document.getElementById("slider2");
    var photobanner2holder = document.getElementsByClassName("photobanner")[1];
    document.documentElement.style.setProperty('--bannerwidth', `${topRated.length * 23}vw`);  

    function pauseSlider(e) {
        photobannerholder.style.animationPlayState = "paused";
    }

    function runSlider(e) {
        photobannerholder.style.animationPlayState = "running";
    }
    
    function pauseSlider2(e) {
        photobanner2holder.style.animationPlayState = "paused";
    }

    function runSlider2(e) {
        photobanner2holder.style.animationPlayState = "running";
    }
    
    return(
        <div>
            <h1 className='slider_title'>Top Rated</h1>
            <div id="slider1">
                <div onMouseOver={pauseSlider} onMouseOut={runSlider} className='photobanner'>
                {topRated.map((post) => (
                    <a className='sliderbox' href={`https://image.tmdb.org/t/p/original/${post.poster_path}`} target='_blank'>
                        <img className='sliderimg' src={`https://image.tmdb.org/t/p/original/${post.poster_path}`} />
                        <p className='caption'>{`${post.original_title}`}</p>
                    </a>
                    ))}
                {topRated.map((post) => (
                    <a className='sliderbox' href={`https://image.tmdb.org/t/p/original/${post.poster_path}`} target='_blank'>
                        <img className='sliderimg' src={`https://image.tmdb.org/t/p/original/${post.poster_path}`} />
                        <p className='caption'>{`${post.original_title}`}</p>
                    </a>
                    ))}
                </div>
            </div>
            <h1 className='slider_title'>Popular</h1>
            <div id="slider2">
                <div onMouseOver={pauseSlider2} onMouseOut={runSlider2} className='photobanner'>
                {posts.map((post) => (
                    <a className='sliderbox' href={`https://image.tmdb.org/t/p/original/${post.poster_path}`} target='_blank'>
                        <img className='sliderimg' src={`https://image.tmdb.org/t/p/original/${post.poster_path}`} />
                        <p className='caption'>{`${post.original_title}`}</p>
                    </a>
                    ))}
                {posts.map((post) => (
                    <a className='sliderbox' href={`https://image.tmdb.org/t/p/original/${post.poster_path}`} target='_blank'>
                        <img className='sliderimg' src={`https://image.tmdb.org/t/p/original/${post.poster_path}`} />
                        <p className='caption'>{`${post.original_title}`}</p>
                    </a>
                    ))}
                </div>
            </div>
        </div>
    ); 
}

export default Container; 