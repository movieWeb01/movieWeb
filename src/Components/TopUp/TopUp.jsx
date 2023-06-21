import React from "react";
import "./TopUp.css";
import { Link } from "react-router-dom";

function TopUp() {
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      }; 
    
    return(
        <div>
            <button id="top_btn" onClick={scrollToTop}>↑</button>
        </div>
    ); 
}

export default TopUp;
