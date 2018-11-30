import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, 
TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import '../App.css';
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
    firebase.auth().createUserWithEmailAndPassword(email, contraseña)
    .then((u)=>{
        alert("Cuenta creada exitosamente!");
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: document.getElementById('nombreyape').value,
            })
            .then(function(){
                    firebase.database().ref(`usuarios/${user.uid}`).set({
                        name: displayName,
                        email: email,
                        contraseña: contraseña,
                        dinero: 0,
                    })
                    .then(function(){
                            console.log("Documento creado!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
            }).catch(function(error) {});
    })
    .catch((error) => {
        console.log(error);
      })
}
IniciarSesion(e){
        e.preventDefault();
        const {email, contraseña} = store.getState().usuario;
        firebase.auth().signInWithEmailAndPassword(email, contraseña)
        .then((u)=>{
        }).catch((error) => {
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
                <Form>
                <Label></Label>
                    <Row form>
                        <Col md={8}>
                            <FormGroup>
                                <Input onChange={this.cambiarEmail} type="text" name="email" id="exampleEmail" placeholder="Correo electronico" />
                            </FormGroup>
                        </Col>
                        <Col md={8}>
                            <FormGroup>
                                <Input onChange={this.cambiarContraseña} type="text" name="password" id="examplePassword" placeholder="Contraseña" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button type="submit" onClick={this.IniciarSesion}>Ingresar</Button>
                </Form>
            </TabPane>
            <TabPane tabId="2">
                <Form>
                <Label></Label>
                    <Row form>
                        <Col md={8}>
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
                    <Button type="submit" onClick={this.CrearCuenta}>Crear Cuenta</Button>
                </Form>
            </TabPane>
        </TabContent>
        </div>
    </div> 
    )
}
}