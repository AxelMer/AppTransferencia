import React, { Component } from 'react';
import './App.css';
import Login from './Componentes/Login';
import firebase from './Database/firebase';
import Perfil from './Componentes/Perfil';
import { autenticado  } from './Acciones/acciones';
import store from './Store/index';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        autenticado(true)
      }
    });
  };
  render() {  
    const { autenticado } = store.getState();
    return (
      <div className="App">
        {autenticado &&
          (
          <Perfil />
          )
        }
        {!autenticado &&
          (<Login />)
        }
      </div>
    );
  }}

export default App;