import React from 'react';
import {InputGroup, InputGroupAddon, Input, Card, CardHeader, CardBody,
CardTitle, CardText, Col, Button, FormGroup } from 'reactstrap';
import Header from './header';
import store from '../Store/index';
import firebase from '../Database/firebase';
//import { verificar } from '../Acciones/acciones';
import { cambiarDinero, cambiarEmail, cambiarNombre, guardarUsuario } from '../Acciones/acciones';

export default class Perfil extends React.Component{
constructor(props) {
    super(props);
    this.state = {
        ListaDatos: [],
    }
}
componentDidMount() {
    var db=firebase.database();
    db.ref('/usuarios')
       .once("value")
       .then((dato_persona) => {
           dato_persona.forEach((element) => {
               const datoPersona = element.val();
               datoPersona.id = element.key;
               this.state.ListaDatos.push(datoPersona);
           });
           var user = firebase.auth().currentUser;
            var lista = this.state.ListaDatos;
            for(var i = 0, len = lista.length; i < len; i++) {
                if (lista[i].uid === user.uid ) {
                    var data = {
                        uid: lista[i].uid,
                        displayName: lista[i].name,
                        email: lista[i].email,
                        contraseña: lista[i].contraseña,
                        dinero: lista[i].dinero ,
                    }
                    guardarUsuario(data)
                    console.log(data)
             break;
        }else{
        }

    }

        });  
};
cambiarDinero(event){
    const nuevoDinero = event.target.value;
    cambiarDinero(nuevoDinero);
}
cambiarEmail(event){
    const nuevoEmail = event.target.value;
    cambiarEmail(nuevoEmail);
}
cambiarNombre(event){
    const nuevoNombre = event.target.value;
    cambiarNombre(nuevoNombre);
}

comprobamos(){
    //Comprobamos que los campos esten completos
    const buscarEmail = document.getElementById("buscaremail").value;
    var regex = /[A-Za-z]+@+[A-Za-z]+.+[A-Za-z]/;
    if((buscarEmail.length > 0) &&
       (regex.test(buscarEmail))){
     }else{
        alert("El formato de email ejemplo@gmail.com");
     }
}

    render(){
        const { uid, displayName, email, dinero } = store.getState().usuario;
        const { verificar } = store.getState();
        const list1 = this.state.ListaDatos;
        console.log(list1)
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
                                <CardTitle onChange={this.cambiarDinero}>$ {dinero}</CardTitle>
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
                                        <Input id="buscaremail" placeholder="Ingrese email al que desea enviar" />
                                        <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={this.comprobamos}>Comprobar</Button></InputGroupAddon>
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