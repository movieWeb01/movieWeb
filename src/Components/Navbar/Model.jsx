


import React, { useState, useEffect} from "react";
import ReactDOM from "react-dom";
import "./Model.css";
import axios from "axios";

function Modal({Pro, Ca, show, closeModal}){
    const info = Pro;
    const category = Ca;
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(1000);/*點樣決定每頁展示多少Item*/

    const lastTodoInView = currentPage * todosPerPage;
    const firstTodoInView = lastTodoInView - todosPerPage;
    const todosForDisplay = movies.slice(firstTodoInView, lastTodoInView);
    const renderItems = todosForDisplay.map((todo, index) => {
        console.log(todo.title)
        return (
          <div className="movieItem">
              <img
                style={{ width: "180px", height: "200px" }}
                src={`https://image.tmdb.org/t/p/w500/${todo.poster_path}`}
              />
            <div>
                            <h4 key={index}>{todo.title}</h4>
            </div>


          </div>
        );
      });

      const pageNumbers = [];
      for (let n = 1; n <= Math.ceil(movies.length / todosPerPage); n++) {
        pageNumbers.push(n);
      }
          const searchMovies = () => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${info}`
          )

          .then((response) => {
            const data = response.data;

            setMovies(data.results);
          });

      };
      const searchCategory = (info) => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${category}`
          )
          .then((response) => {
            const data = response.data;

            setMovies(data.results);
          });
          
      };
      useEffect(() => {
        if (info) {
            
          searchMovies(info);
        } else {
          setMovies([]);
        }
      }, [info]);
      useEffect(() => {
        if (category) {
          searchCategory();
        } else {
          setMovies([]);
        }
      }, [category]);
    if(!show) return null;

    return ReactDOM.createPortal(
    <div className="modal">
    <div className="overlay" onClick={closeModal}></div>
        <div className="content">
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "400px",
            width: "100%",
            left: "700px",
            position:"relative"
          }}
        >
          {renderItems}
          
        </div>


            <button style={{position:"fixed", bottom:"00px" }}onClick={closeModal}>Close</button>
        </div>

    </div>,
    document.getElementById("root")
    );
}

export default Modal;