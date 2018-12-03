import React from 'react';
import {InputGroup, InputGroupAddon, Input, Card, CardHeader, CardBody,
CardTitle, CardText, Col, Button, Alert } from 'reactstrap';
import swal from 'sweetalert2'
import Header from './header';
import store from '../Store/index';
import firebase from '../Database/firebase';
import VistaUsuario from './modoPrueba';
import { verificar, cambiarMonto, guardarUsuario, guardarReceptor  } from '../Acciones/acciones';

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
             break;
        }else{
        }

    }

        });  
};

cambiarMonto(event){
    const nuevoMonto = event.target.value;
    cambiarMonto(nuevoMonto);
}

validacionCampo(){
    //Comprobamos que los campos esten completos
    //definimos la estructura del ingreso de datos con un regex
    const { email } = store.getState().usuario;
    const buscarEmail = document.getElementById("buscaremail").value;
    var regex = /[A-Za-z]+@+[A-Za-z]+.+[A-Za-z]/;
    if((buscarEmail.length > 0) &&
       (regex.test(buscarEmail)) &&
       (buscarEmail !== email)){
           this.verificarEmail();
     }else{
        alert("Verifique que el email ingresado sea el correcto");
        verificar(false)
     }
}

verificarEmail(){
    //verificamos que el email se encuentre en el array con los datos que se almacena en firebase
    var dato = document.getElementById("buscaremail").value;
    const list = this.state.ListaDatos;
        for(var i = 0, len = list.length; i < len; i++) {
            if (list[i].email === dato )  {
                verificar(true)
                var data = {
                    Reid: list[i].uid,
                    Rename: list[i].name,
                    Redinero: list[i].dinero ,
                    Reemail:list[i].email,
                }
                guardarReceptor(data)
         break;
    }else{
        console.log("Error")
        verificar(false)
    }
    } 
}

enviarDinero(){
    const { dinero, uid } = store.getState().usuario;
    const { Redinero, Reid } = store.getState().receptor;
    const { monto } = store.getState();
    var result = dinero - monto;
    var suma = parseInt(Redinero) + parseInt(monto);
    if((dinero > 0 ) && 
    (monto <= dinero) &&
    monto > 0)
    {
    firebase.database().ref(`usuarios/${Reid}`).update({
            dinero: suma,
    }).then(function(exito){
        let timerInterval
        swal({
          title: 'Realizando Envio',
          timer: 3000,
          allowOutsideClick: false,
          onOpen: () => {
            swal.showLoading()
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
          ) {
            window.location.reload(true)
            verificar(false);
            console.log('I was closed by the timer')
          }
        })
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
            <div>
                <Header/>
                <div className="contenedor">
                    <div className="row">
                        <div className="col-sm-3">
                            <hr/><br/>   
                            <Col sm="12">
                            <Card>
                                <CardHeader>Saldo Disponible</CardHeader>
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
                                    <Alert color="dark">
                                       Modo Prueba usar Email: <b>prueba@gmail.com</b>
                                    </Alert>
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
                                                    <Input id="enviarDinero" onChange={this.cambiarMonto} placeholder="Ingrese el Monto a enviar" type="text" step="1" />
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
                                    <hr/>
                                    <VistaUsuario/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}