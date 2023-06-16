import React from 'react';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
Button } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div style={{backgroundColor:"skyblue", position:"static", left:"0px", fontSize:"30px" }}>
        <Navbar  light expand="md" className='container'>
          <NavbarBrand href="/" style={{fontSize:"30px"}}>Love Movie</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar style={{display:"flex", rowDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
            <Nav className="ml-auto" navbar style={{position:"relative", top:"3px"}}>
              <NavItem>
                <NavLink href="">Components</NavLink>
              </NavItem>
              <NavItem style={{display:"flex", rowDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                <NavLink href="">Search</NavLink>
                <Input style={{position:"relative", left:"00px", width:"700px", height:"50px", fontSize:"25px"}} placeholder='What movie are you looking for?'/>
              </NavItem>
              
              <UncontrolledDropdown nav inNavbar style={{display:"flex", rowDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                <div style={{position:"relative", left:"300px"}}>
                <DropdownToggle nav caret>
                  <b>類別</b>
                </DropdownToggle>
                
                <DropdownMenu style={{fontSize:"30px", backgroundColor:"pink"}}>
                  <DropdownItem className='item'>
                    科幻
                  </DropdownItem>
                  <DropdownItem className='item'>
                    愛情
                  </DropdownItem>
                  <DropdownItem className='item'>
                  冒險
                  </DropdownItem>
                  <DropdownItem className='item'>
                  宗教
                  </DropdownItem>
                  <DropdownItem className='item'>
                  動作
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
                </div>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}