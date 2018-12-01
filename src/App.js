import React, { Component } from 'react';
import './App.css';
import Login from './Componentes/Login';
import firebase from './Database/firebase';
import Perfil from './Componentes/Perfil';
import { guardarUsuario, autenticado  } from './Acciones/acciones';
import store from './Store/index';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        guardarUsuario(user)
        console.log(guardarUsuario)
        autenticado(true)
      }
    });
  };
  render() {  
    const { autenticado } = store.getState();
    return (
      <main>
        {autenticado &&
          (<Perfil />)
        }
        {!autenticado &&
          (<Login />)
        }
      </main>
    );
  }}

export default App;