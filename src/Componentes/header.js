import React, {Component} from 'react';
import '../App.css';
import { Nav,  Navbar, NavbarBrand, 
  Dropdown, DropdownMenu, DropdownToggle, DropdownItem, NavLink, } from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import store from '../Store/index';
import firebase from '../Database/firebase';

class Header extends Component {
constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
}
toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
}
cerrarSesion(e) {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
     window.location.assign('/');
  }).catch(function(error) {
  });
}

  render(){
      const { dropdownOpen } = store.getState();
      const { displayName } =  store.getState().usuario;
    return (
        <header>
            <div className="App-header">
                <Navbar>
                <NavbarBrand href="/">App Transferencia</NavbarBrand>
                    <Nav>
                        <NavLink>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle tag="span" onClick={this.dropdown} data-toggle="dropdown" aria-expanded={dropdownOpen}>
                                    <Chip
                                        label={displayName}
                                    />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.cerrarSesion}>Cerrar Sesion!</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavLink> 
                    </Nav>
                </Navbar>
            </div>
       </header>
    );
}
}
export default Header