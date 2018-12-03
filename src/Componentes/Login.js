import React from "react";
import { Col, Row, Button, Form, FormGroup, Input, 
TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import '../App.css';
import logo from '../intercambio.svg';
import firebase from '../Database/firebase';
import store from '../Store/index';
import { activeTab, cambiarNombre, cambiarEmail, cambiarContraseña } from '../Acciones/acciones';

export default class Sesion extends React.Component {
constructor(props) {
    super(props);
    this.IniciarSesion = this.IniciarSesion.bind(this);
    this.CrearCuenta = this.CrearCuenta.bind(this);
    this.toggle = this.toggle.bind(this);
}
toggle(tab) {
        if (activeTab !== tab) {
            activeTab(tab)
        }
}
CrearCuenta(e){
    const {email, contraseña, displayName} = store.getState().usuario;
    e.preventDefault();
    //Creamos una Authentication de firebase
    //Tomando el email y contraseña
    firebase.auth().createUserWithEmailAndPassword(email, contraseña)
    .then((u)=>{
        //Agarramos el usuario creado y realizamos una actualizacion de nombre en displayName
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: document.getElementById('nombreyape').value,
            })
        //Creamos un documento en el Database de firebase
            firebase.database().ref(`usuarios/${user.uid}`).set({
                    uid: user.uid,
                    name: displayName,
                    email: email,
                    contraseña: contraseña,
                    dinero: 1000,
            }).then(function(exito){
                            console.log("Documento creado!");
                        })
                        .catch(function(err) {
                            console.error("Error writing document: ", err);
                        });
    })
    .catch((err) => {
        alert(err)
        console.log(err);
      })
}
IniciarSesion(e){
        e.preventDefault();
        const {email, contraseña} = store.getState().usuario;
        firebase.auth().signInWithEmailAndPassword(email, contraseña)
        .then((u)=>{
        }).catch((error) => {
            alert(error)
            console.log(error);
          });
}

cambiarEmail(event){
    const nuevoEmail = event.target.value;
    cambiarEmail(nuevoEmail);
}

cambiarContraseña(event){
    const nuevoContraseña = event.target.value;
    cambiarContraseña(nuevoContraseña);
}

cambiarNombre(event){
    const nuevoNombre = event.target.value;
    cambiarNombre(nuevoNombre);
}

render() {
    const { activeTab } = store.getState();
    return (
            <div className="form-main">
                <div className="form-div">
                <img src={logo} className="App-logo" alt="logo" />
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            >
                            Iniciar Sesion
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            >
                            Crear Cuenta
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                    <div className="container">
                        <Form>
                            <Row form>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input onChange={this.cambiarEmail} type="text" name="email" id="exampleEmail" placeholder="Correo electronico" />
                                    </FormGroup>
                                </Col>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input onChange={this.cambiarContraseña} type="password" name="password" id="examplePassword" placeholder="Contraseña" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Button type="submit" onClick={this.IniciarSesion}>Ingresar</Button>
                        </Form>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="container">
                            <Row form>
                                <Col md={10}>
                                    <FormGroup>
                                        <Input onChange={this.cambiarNombre} type="text" name="nombreyape" id="nombreyape" placeholder="Nombre Y Apellido" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input  onChange={this.cambiarEmail} type="text" name="email" id="email" placeholder="Correo Electronico" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input onChange={this.cambiarContraseña}  type="password" name="contraseña" id="econtraseña" placeholder="Contraseña" />
                                    </FormGroup>
                                </Col>
                            </Row>
                             <hr/>
                             <Col md={10} >
                             <Button type="submit" onClick={this.CrearCuenta}>Crear Cuenta</Button>
                             </Col>
                        </div>
                    </TabPane>
                </TabContent>
                </div>
            </div> 
    )
}
}