import React from 'react';
import {
InputGroup, InputGroupAddon, Input, Card, CardHeader, CardBody,
CardTitle, CardText, Col } from 'reactstrap';
import Header from '../header';
import Tranferir from './transferir';
import store from '../../Store/index';
import firebase from '../../Database/firebase';
import { cambiarDinero } from '../../Acciones/acciones';

export default class Perfil extends React.Component{
cambiarDinero(event){
    const nuevoDinero = event.target.value;
    cambiarDinero(nuevoDinero);
}

    render(){
        const { uid, displayName, email, dinero } = store.getState().usuario;
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        const referencia = database.ref('/persona').once("value")
        .then(() => {
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
                if (uid === doc) {
                    cambiarDinero(doc.data().dinero)
                }else{
                    console.log("TODO MAL")
                }
          });
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
    
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
                        <div className="col-sm-9">
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
                                <Tranferir/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}