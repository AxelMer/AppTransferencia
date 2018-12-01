import React from 'react';
import {InputGroup, InputGroupAddon, Input, Card, CardHeader, CardBody,
CardTitle, CardText, Col, Button, FormGroup } from 'reactstrap';
import Header from './header';
import store from '../Store/index';
import firebase from '../Database/firebase';
import { verificar } from '../Acciones/acciones';
export default class Perfil extends React.Component{
verificamos(){
    //Para verificar que el email ingresado se encuentre en la base de datos debemos llamar a los datos guardados
    //en firebase
    const buscarEmail = document.getElementById("buscaremail").value;
    var database = firebase.database();
    var regex = /[A-Za-z]+@+[A-Za-z]+.+[A-Za-z]/;
    if((buscarEmail.length > 0) &&
       (regex.test(buscarEmail))){
       database.ref('/usuarios')
       .once("value")
       .then((dato_persona) => {
           dato_persona.forEach((element) => {
               const datoPersona = element.val();
               const ListaDatos= [];
               //console.log(datoPersona);
               datoPersona.id = element.key;
               ListaDatos.push(datoPersona);
               for(var i = 0, len = ListaDatos.length; i < len; i++) {
               if (datoPersona.email === buscarEmail) {
                    verificar(true) 
                    break;
               }else{
                  alert ("El email ingresado nose encuentra en el sistema")
               }
           }
           });
        });
     }else{
        alert("El formato de email ejemplo@gmail.com");
     }
}
    render(){
        const { uid, displayName, email, dinero } = store.getState().usuario;
        const { verificar } = store.getState();
        return(
            <main>
                <Header/>
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <hr/><br/>   
                            <Col sm="12">
                            <Card>
                                <CardHeader>Dinero Disponible</CardHeader>
                                <CardBody>
                                <CardTitle>$ {dinero}</CardTitle>
                                <CardText></CardText>
                            </CardBody>
                             </Card>
                            </Col>
                            <hr/>
                        </div>
                        <div className="col-sm-6">
                        <div className="tab-content">
                            <div className="tab-pane active" id="home">
                                <hr/>
                                  <form className="form">
                                    <div className="form-group">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">Id de Usuario</InputGroupAddon>
                                                <Input placeholder={uid} disabled />
                                            </InputGroup>
                                        </div>
                                    <div className="form-group">
                                          <div className="col-xs-6">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">Nombre</InputGroupAddon>
                                                <Input placeholder={displayName} disabled />
                                            </InputGroup>
                                          </div>
                                      </div>
                                    <div className="form-group">
                                      <div className="col-xs-6">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                                <Input placeholder={email} disabled />
                                            </InputGroup>
                                          </div>
                                      </div>
                                  </form>
                                <hr/>
                                <div>
                                    <h2>Realizar una tranferencia:</h2>
                                    <InputGroup>
                                        <Input id="buscaremail" placeholder="Ingrese email al que desea" />
                                        <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={this.verificamos}>Enviar</Button></InputGroupAddon>
                                    </InputGroup>
                                    <div>
                                    {verificar &&
                                            (

                                            <div>
                                                <hr/>
                                                <div>
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
                                                </div>
                                            </div>
                                            )
                                            }{!verificar &&
                                                (<div></div>)
                                              }
                                    </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}