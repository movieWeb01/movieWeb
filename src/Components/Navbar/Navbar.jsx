import React, { useState, useEffect } from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
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
  Input
} from 'reactstrap';

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState('');
  const [category, setCategory] = useState('');
  const toggle = () => setIsOpen(!isOpen);
  const [movies, setMovies] = useState([]);

  const searchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2bcdb3df9702bc31542cffaec406fda7&query=${info}`
      )
      .then((response) => {
        const data = response.data;
        console.log(response)
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
        console.log(response)
        setMovies(data.results);
      });
  };
  const popularMovie = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=2bcdb3df9702bc31542cffaec406fda7&language=en-US&page=1'
      )
      .then((response) => {
        const data = response.data;
        console.log(response)
        setMovies(data.results);
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


  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(4);
  const lastTodoInView = currentPage * todosPerPage;
  const firstTodoInView = lastTodoInView - todosPerPage;
  const todosForDisplay = movies.slice(firstTodoInView, lastTodoInView);
  const renderItems = todosForDisplay.map((todo, index) => {
    return <div className="movieItem">
      <h4 key={index}>{todo.title}</h4>
      <h4 key={index}>{todo.genre_ids}</h4>
      <div>
      <img style={{width: "180px", height:"200px"}}src={`https://image.tmdb.org/t/p/w500/${todo.poster_path}`}/>
      <img style={{width: "180px", height:"200px"}}src={`https://image.tmdb.org/t/p/w500/${todo.backdrop_path}`}/>
      </div>
      </div>;

  });
  const pageNumbers = [];
  for (let n = 1; n <= Math.ceil(movies.length / todosPerPage); n++) {
    pageNumbers.push(n);
  }
  const renderPageNumbers = pageNumbers.map((number, index) => {
    return (
      <span style={{margin:"10px 20px"}} onClick={() => setCurrentPage(number)} key={index}>
        {number}
      </span>
    );
  });
  return (
    <div
      style={{
        backgroundColor: 'skyblue',
        position: 'sticky',
        top: '0px',
        fontSize: '50px',
        width:"100%",
        zIndex: 99
      }}
    >
    <div
      style={{
        backgroundColor: 'skyblue',
        fontSize: '50px',
        
      }}>


      <Navbar light expand="md">
        <NavbarBrand style={{ fontSize: '30px' }}>
          Love Movie
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar
          style={{
            display: 'flex',
            rowDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Nav
            className="ml-auto"
            navbar
            style={{
              position: 'relative',
              top: '3px',
              fontSize: '25px',
            }}
          >
                        <NavItem>
            <NavLink onClick={popularMovie} style={{cursor: "pointer", position:"relative", right:"200px", top:"10px"}}>受歡迎</NavLink>
            </NavItem>
            <NavItem
              style={{
                display: 'flex',
                rowDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              
              <Input
                style={{
                  position: 'relative',
                  left: '00px',
                  width: '700px',
                  height: '50px',
                  fontSize: '25px',
                  paddingLeft: "20px"
                }}
                placeholder="What movie are you looking for?"
                value={info}
                maxLength={100000000}
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
              /><i style={{fontSize:"20px", position:"relative", right:"80px", color:"black"}}>Search</i>
            </NavItem>
            <UncontrolledDropdown
              nav
              inNavbar
              style={{
                display: 'flex',
                rowDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div style={{ position: 'relative', left: '250px' }}>
                <DropdownToggle nav caret style={{ fontSize: '25px' }}>
                  <b className='category'>類別</b>
</DropdownToggle>
<DropdownMenu style={{ fontSize: '30px', backgroundColor: 'pink' }}>
<DropdownItem className="item" onClick={() => {setCategory("Science Fiction");}}>
科幻
</DropdownItem>
<DropdownItem className="item" onClick={() => {setCategory("Familie");}}>
家庭
</DropdownItem>
<DropdownItem className="item" onClick={() => {setCategory("Abenteuer");}}>
冒險
</DropdownItem>
<DropdownItem className="item" onClick={() => {setCategory("Animation");}}>
動畫
</DropdownItem>
<DropdownItem className="item" onClick={() => {setCategory("Action");}}>
動作
</DropdownItem>
<DropdownItem divider />
</DropdownMenu>
</div>
</UncontrolledDropdown>
</Nav>
</Collapse>

</Navbar>


</div>

<div>
      <div style={{display:"flex", flexFlow: "row nowrap",justifyContent:"center", alignItems:"flex-start", height: "auto", width:"100%"}}>{renderItems}</div>
      <div className="numbers" style={{marginTop: "80px", fontSize:"40px",display:"flex", flexFlow: "row nowrap",justifyContent:"center", alignItems:"center", height: "auto", width:"100%"}}>{renderPageNumbers}</div>
    </div>
</div>
);
};

export default Example;