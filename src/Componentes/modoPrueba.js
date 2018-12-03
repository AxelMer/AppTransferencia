import React from 'react';
import store from '../Store/index';

export default class VistaUsuario extends React.Component{
    render(){
        //Traemos los datos del objeto del Store
        const { Reemail, Redinero, Rename} = store.getState().receptor;
        const { monto, verificar } = store.getState();
        var suma = parseInt(Redinero) + parseInt(monto);
        return(
            <div>
            {verificar &&
                (
                <div>
                    <h2>Live Demo </h2>
                    <p>Nombre: {Rename}</p>
                    <p>Email: {Reemail} </p>
                    <p>Saldo: {Redinero} </p>
                    <p>Saldo a enviar:{monto}</p>
                    <p>Total: {suma} </p>
                </div>
                )
                }{!verificar &&
                    (<div></div>)
                  }

            </div>
        );
    }
}