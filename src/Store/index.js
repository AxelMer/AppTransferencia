import createStore from 'pure-store'
const store = createStore({ 
    usuario:{
        uid:'',
        displayName: '',
        email: '',
        contraseña: '',
        dinero: 0 ,
    },
    receptor:'',
    user: null,
    autenticado: false,
    verificar: false,
    activeTab: '1',
    dropdownOpen: false, 
    collapse: false,
 });

 export default store;