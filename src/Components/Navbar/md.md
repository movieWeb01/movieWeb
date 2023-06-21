import React, { useState, useEffect,useMemo } from "react";
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
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
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
  const md = useMediaQuery("(max-width: 700px)");


  return {md};
}
function ResponsiveComponent() {
  const { md} = useMediaQueries();
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  const [movies, setMovies] = useState([]);
  const [moviesGenres, setMoviesGenres] = useState([]);
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
  const searchCategory = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${category}`
      )
      .then((response) => {
        const data = response.data;

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
        <h4 key={index}>{todo.title}</h4>
        <h4 key={index}>{todo.genre_ids}</h4>
        <div>
          <img
            style={{ width: "180px", height: "200px" }}
            src={`https://image.tmdb.org/t/p/w500/${todo.poster_path}`}
          />
          <img
            style={{ width: "180px", height: "200px" }}
            src={`https://image.tmdb.org/t/p/w500/${todo.backdrop_path}`}
          />
        </div>
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
        {number}
      </span>
    );
  });
  if (md) {
    return <div
    style={{
      backgroundColor: "skyblue",
      position: "sticky",
      top: "0px",
      fontSize: "50px",
      width: "100%",
      zIndex: 99,
    }}
  >
    <div
className="Navigation"
    >
      <Navbar light expand="md">
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          <NavbarBrand style={{ fontSize: "30px" }}>Love Movie</NavbarBrand>
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
          <Nav
            className="ml-auto"
            navbar
            style={{
              position: "relative",
              top: "3px",
              fontSize: "25px",
            }}
          >
            <NavItem>
              <Link
                to={"movies/popular"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <NavLink
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    right: "200px",
                    top: "3px",
                    fontSize: "25px",
                  }}
                >
                  受歡迎
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to={"movies/top_rated"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <NavLink
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    right: "150px",
                    top: "3px",
                    fontSize: "25px",
                  }}
                >
                  Top Rated
                </NavLink>
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
                style={{
                  position: "relative",
                  left: "00px",
                  width: "550px",
                  height: "50px",
                  fontSize: "25px",
                  paddingRight: "85px",
                }}
                placeholder="What movie are you looking for?"
                value={info}
                maxLength={100000000}
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
              />
              <i
                style={{
                  fontSize: "20px",
                  position: "relative",
                  right: "80px",
                  color: "black",
                }}
              >
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
              <div style={{ position: "relative", left: "250px" }}>
                <DropdownToggle nav caret style={{ fontSize: "25px" }}>
                  <b className="category">類別</b>
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
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "auto",
          width: "100%",
        }}
      >
        {renderItems}
      </div>
      <div
        className="numbers"
        style={{
          position: "relative",
          top: "40px",
          fontSize: "40px",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          width: "100%",
        }}
      >
        {renderPageNumbers}
      </div>
    </div>
  </div>;
  }

  return <div
  style={{
    backgroundColor: "skyblue",
    position: "sticky",
    top: "0px",
    fontSize: "50px",
    width: "100%",
    zIndex: 99,
  }}
>
  <div
className='Navigation'
  >
    <Navbar light expand="md">
      <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
        <NavbarBrand style={{ fontSize: "30px" }}>Love Movie</NavbarBrand>
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
        <Nav
          className="ml-auto"
          navbar
          style={{
            position: "relative",
            top: "3px",
            fontSize: "25px",
          }}
        >
          <NavItem>
            <Link
              to={"movies/popular"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <NavLink
                style={{
                  cursor: "pointer",
                  position: "relative",
                  right: "200px",
                  top: "3px",
                  fontSize: "25px",
                }}
              >
                受歡迎
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to={"movies/top_rated"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <NavLink
                style={{
                  cursor: "pointer",
                  position: "relative",
                  right: "150px",
                  top: "3px",
                  fontSize: "25px",
                }}
              >
                Top Rated
              </NavLink>
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
              style={{
                position: "relative",
                left: "00px",
                width: "550px",
                height: "50px",
                fontSize: "25px",
                paddingRight: "85px",
              }}
              placeholder="What movie are you looking for?"
              value={info}
              maxLength={100000000}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
            />
            <i
              style={{
                fontSize: "20px",
                position: "relative",
                right: "80px",
                color: "black",
              }}
            >
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
            <div style={{ position: "relative", left: "250px" }}>
              <DropdownToggle nav caret style={{ fontSize: "25px" }}>
                <b className="category">類別</b>
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
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "auto",
        width: "100%",
      }}
    >
      {renderItems}
    </div>
    <div
      className="numbers"
      style={{
        position: "relative",
        top: "40px",
        fontSize: "40px",
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "100%",
      }}
    >
      {renderPageNumbers}
    </div>
  </div>
</div>;
}
const Example = () => {
  
  return (
    <ResponsiveComponent />
  );
};

export default Example;
