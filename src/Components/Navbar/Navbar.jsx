import React, { useState, useEffect, useMemo } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Modal from "./Model";

function useMediaQuery(query) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mediaQuery]);

  return match;
}

function useMediaQueries() {
  const sm = useMediaQuery("(max-width: 650px)");
  const md = useMediaQuery("(max-width: 1450px)");

  return { sm, md };
}


function ResponsiveComponent() {
    const [isOpen, setIsOpen] = useState(false);
const [info, setInfo] = useState("");
const [category, setCategory] = useState("");
const toggle = () => setIsOpen(!isOpen);
const [movies, setMovies] = useState([]);
const [moviesGenres, setMoviesGenres] = useState([]);
const [show, setShow] = useState(false);
const searchMovies = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${info}`
    )
    .then((response) => {
      const data = response.data;
      console.log(response);
      setMovies(data.results);
    });
};
const searchCategory = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${category}`
    )
    .then((response) => {
      const data = response.data;
      console.log(response);
      setMovies(data.results);
    });
};
const popularMovie = () => {
  axios
    .get(
      "https://api.themoviedb.org/3/movie/popular?api_key=2bcdb3df9702bc31542cffaec406fda7&language=en-US&page=1"
    )
    .then((response) => {
      const data = response.data;
      console.log(response);
      setMovies(data.results);
    });
};

const movieGenres = () => {
  axios
    .get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=6a3a9e9a61085d657b30d36d1c7b5ba7"
    )
    .then((res) => {
      console.log("genres", res.data.genres);
      setMoviesGenres(res.data.genres);
    });
};
useEffect(() => {
  if (info) {
    searchMovies();
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
useEffect(() => {
  movieGenres();
}, []);
const [currentPage, setCurrentPage] = useState(1);
const [todosPerPage, setTodosPerPage] = useState(4);
const lastTodoInView = currentPage * todosPerPage;
const firstTodoInView = lastTodoInView - todosPerPage;
const todosForDisplay = movies.slice(firstTodoInView, lastTodoInView);
const renderItems = todosForDisplay.map((todo, index) => {
  return (
    <div className="movieItem">
      <div>
      <h4 key={index}>{todo.title}</h4>

        </div>
        <img
        className="image"

          src={`https://image.tmdb.org/t/p/original/${todo.poster_path}`}
        />
      </div>
    );
  });
  const pageNumbers = [];
  for (let n = 1; n <= Math.ceil(movies.length / todosPerPage); n++) {
    pageNumbers.push(n);
  }
  const renderPageNumbers = pageNumbers.map((number, index) => {
    return (
      <span
        style={{ margin: "10px 20px" }}
        onClick={() => setCurrentPage(number)}
        key={index}
      >
        P.{number}
      </span>
    );
  });
  const { md, sm } = useMediaQueries();


  if (sm, md) {
    return     <div
    style={{
      position: "fixed",
      top: "-00px",
      fontSize: "50px",
      width: "100%",
      zIndex: 99,

    }}
  >
    <div
      className="Navigation"      
    >
      <Navbar light expand="md" className="Navbar">



        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar
          style={{
            display: "flex",
            rowDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Nav
            className="ml-auto"
            navbar
            style={{


            }}
          >
            <div className="NavItemGroup">
                      <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          <NavbarBrand className="NavbarBrand">Love Movie</NavbarBrand>
        </Link>
            <NavItem className="NavItem">
              <Link
                to={"movies/popular"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <NavLink
                className="popular">
                  Popular
                </NavLink>
              </Link>
            </NavItem>

            <NavItem className="NavItem">
              <Link
                to={"movies/top_rated"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <NavLink
                  className="topRated">
                  Top Rated
                </NavLink>
              </Link>
            </NavItem>
            </div>
            <NavItem
              style={{
                display: "flex",
                rowDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Input
                className="input"
                placeholder="What movie are you looking for?"
                value={info}
                maxLength={100000000}
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
              />
              <i
              className="Search">
                Search
              </i>
            </NavItem>
            <UncontrolledDropdown
              nav
              inNavbar
              style={{
                display: "flex",
                rowDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div className="categoryGroup">
                <DropdownToggle nav caret>
                  <b className="category">Genres</b>
                </DropdownToggle>
                <DropdownMenu
                  style={{ fontSize: "30px", backgroundColor: "pink" }}
                >
                                      {moviesGenres.map((gen) => (
                      <Link
                        to={`/moviesGenres/${gen.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem className="item">{gen.name}</DropdownItem>
                      </Link>
                    ))}
                  <DropdownItem divider />
                </DropdownMenu>
              </div>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        
      </Navbar>

    </div>
    <div>
          <div className="numbers">{renderPageNumbers}</div>
          <div className="showMovie">{renderItems}</div>
        </div>

  </div>;
  }

  return <div
      style={{
        backgroundColor: "black",
        position: "sticky",
        top: "0px",
        fontSize: "50px",
        width: "100%",
        zIndex: 99,
      }}
    >
      <div className="Navigation">
        <Navbar light expand="md" className="Navbar">
          <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
            <NavbarBrand className="NavbarBrand">
              Love<span style={{ color: "orange" }}>Movie</span>
            </NavbarBrand>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse
            isOpen={isOpen}
            navbar
            style={{
              display: "flex",
              rowDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >

            <Nav className="ml-auto" navbar>
              <div className="NavItemGroup">
                <NavItem className="NavItem">
                  <Link
                    to={"movies/popular"}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <NavLink className="popular">Popular</NavLink>
                  </Link>
                </NavItem>
                <NavItem className="NavItem">
                  <Link
                    to={"movies/top_rated"}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <NavLink className="topRated">Top-rated</NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  style={{
                    display: "flex",
                    rowDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Input
                    className="input"
                    placeholder="What movie are you looking for?"
                    value={info}
                    maxLength={100000000}
                    onChange={(e) => {
                      setInfo(e.target.value);
                    }}
                  />
                  <i className="Search">Search</i>
                </NavItem>
                <NavItem className="NavItem">
                  <Link
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <div style={{ height: "130px", width: "100px" }}>
                      <Button
                        style={{
                          position: "relative",
                          top: "10px",
                          marginLeft:  "-30px", 
                          fontSize: "23px",
                          width: "80px",
                          height: "40px",
                          backgroundColor: "lightgreen",
                        }}
                        onClick={() => setShow((s) => !s)}
                      >
                        Open
                      </Button>
                      <Modal
                        Pro={info}
                        Ca={category}
                        show={show}
                        closeModal={() => setShow(false)}
                      />
                    </div>
                  </Link>
                </NavItem>
              </div>
              <UncontrolledDropdown
                nav
                inNavbar
                style={{
                  display: "flex",
                  rowDirection: "row",
                  marginLeft: "-100px", 
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <div className="categoryGroup">
                  <DropdownToggle nav caret>
                    <b className="category">Genres</b>
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      fontSize: "30px",
                      backgroundColor: "rgb(255, 205, 185)",
                    }}
                  >
                    {moviesGenres.map((gen) => (

                      <Link
                        to={`/moviesGenres/${gen.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem className="item">{gen.name}</DropdownItem>
                      </Link>
                    ))}

                <DropdownItem divider />
              </DropdownMenu>
            </div>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>

    
  </div>


  
</div>;
}
const Example = ({ moviesGenres }) => {


  return (
    <ResponsiveComponent moviesGenres={moviesGenres} />
  );
};

export default Example;