import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';
import AutoComplete from './components/AutoComplete';

// Import compiled SASS
require('./sass/app.sass');
// <MyComponent title="Welcome to my app!" />, 
ReactDOM.render(<MyComponent />, window.document.getElementById('app'));
