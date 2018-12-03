import createStore from 'pure-store'
const store = createStore({ 
    usuario:{
        uid:'',
        displayName: '',
        email: '',
        contraseña: '',
        dinero: 0 ,
    },
    receptor:{
        Rename:'',
        Reid:'',
        Reemail:'',
        Redinero: '',
    },
    monto:'',
    user: null,
    autenticado: false,
    verificar: false,
    activeTab: '1',
    dropdownOpen: false, 
 });

 export default store;