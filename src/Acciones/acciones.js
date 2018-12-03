import store from '../Store';
//Creamos funciones a los onChange para realizar la actualizacion de datos 

export const cambiarEmail = (email) => {
    store.update(s =>{
        s.usuario.email = email
    })
}
export const cambiarNombre = (displayName) => {
    store.update(s =>{
        s.usuario.displayName = displayName
    })
}
export const cambiarContraseña = (contraseña) => {
    store.update(s =>{
        s.usuario.contraseña = contraseña
    })
}
export const cambiarMonto = (monto) => {
    store.update(s =>{
        s.monto = monto
    })
}

export const guardarUsuario = (usuario) => {
    store.update(s => {
        s.usuario = usuario
    })
}
export const guardarReceptor = (receptor) => {
    store.update(s => {
        s.receptor = receptor
    })
}
export const error = (error) => {
    store.update(s => {
        s.error = error
    })
}
export const autenticado = (autenticado) => {
    store.update(s => {
        s.autenticado = autenticado
    })
}
export const verificar = (verificar) => {
    store.update(s => {
        s.verificar = verificar
    })
}
export const activeTab = (activeTab) =>{
    store.update(s => {
        s.activeTab = activeTab
    })
}
