import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memoryUt from "./utils/memoryUt"
import storageUt from "./utils/storageUt"
const user=storageUt.getUser()
memoryUt.user=user
ReactDOM.render( <App/> ,
    document.getElementById('root')
);
