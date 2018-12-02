import React from 'react';
import {InputGroup, InputGroupAddon, Input, Card, CardHeader, CardBody,
CardTitle, CardText, Col, Button } from 'reactstrap';
import Header from './header';
import store from '../Store/index';
import firebase from '../Database/firebase';
import { verificar, guardarReceptor } from '../Acciones/acciones';
import { cambiarDinero, cambiarEmail, cambiarNombre, guardarUsuario } from '../Acciones/acciones';

export default class Perfil extends React.Component{
constructor(props) {
    super(props);
    this.verificarEmail = this.verificarEmail.bind(this);
    this.validacionCampo = this.validacionCampo.bind(this);
    this.enviarDinero = this.enviarDinero.bind(this);
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

validacionCampo(){
    //Comprobamos que los campos esten completos
    //definimos la estructura del ingreso de datos con un regex
    const buscarEmail = document.getElementById("buscaremail").value;
    var regex = /[A-Za-z]+@+[A-Za-z]+.+[A-Za-z]/;
    if((buscarEmail.length > 0) &&
       (regex.test(buscarEmail))){
           this.verificarEmail();
     }else{
        alert("El formato de email ejemplo@gmail.com");
     }
}

verificarEmail(){
    //verificamos que el email se encuentre en el array con los datos que se almacena en firebase
    var dato = document.getElementById("buscaremail").value;
    const list = this.state.ListaDatos;
        for(var i = 0, len = list.length; i < len; i++) {
            if (list[i].email === dato ) {
                verificar(true)
                guardarReceptor(list[i].uid)
                console.log("Datos", dato, "+", list[i].email, `+`, list[i].uid)
         break;
    }else{
        verificar(false)
    }
    } 
}
enviarDinero(){
    const { dinero, uid } = store.getState().usuario;
    const { receptor } = store.getState();
    const monto = document.getElementById("enviarDinero").value;
    var result = dinero - monto;
    if((dinero > 0 ) && 
    (monto <= dinero))
    {
    firebase.database().ref(`usuarios/${receptor}`).update({
            dinero: monto,
    }).then(function(exito){
                    alert("Transferencia exitosa");
                    window.location.reload(true);
                })
                .catch(function(error) {
                    console.error("Error al enviar ", error);
                });
    firebase.database().ref(`usuarios/${uid}`).update({
                    dinero: result,
            })
    } else{
        alert("No es posible enviar esa cantidad")
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
                                        <Input id="buscaremail" placeholder="Ingrese email al que desea enviar" />
                                        <InputGroupAddon addonType="append">
                                        <Button color="secondary" onClick={this.validacionCampo}>Comprobar</Button></InputGroupAddon>
                                    </InputGroup>
                                    <div>
                                    {verificar &&
                                            (

                                            <div>
                                                <hr/>
                                                <div>
                                                <Col md={8}>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                    <Input id="enviarDinero" placeholder="Ingrese el Monto a enviar" type="number" step="1" />
                                                    <Button color="secondary" onClick={this.enviarDinero}>Enviar</Button>
                                                </InputGroup>
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