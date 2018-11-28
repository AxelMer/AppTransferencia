import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from'./Store/index';

const render = ()=> {
  ReactDOM.render(<App />, document.getElementById('root'))
}
 
store.subscribe(render)
render()