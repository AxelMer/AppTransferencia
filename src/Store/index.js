import createStore from 'pure-store'
const store = createStore({ 
    usuario:{
        uid:'',
        displayName: '',
        email: '',
        contraseña: '',
    },
    error: '',
    user: null,
    autenticado: false,
    activeTab: '1',
    dropdownOpen: false, 
 });

 export default store;