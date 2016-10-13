import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';

// Import compiled SASS
require('./sass/app.sass');

ReactDOM.render(<MyComponent title="Welcome to my app!" />, window.document.getElementById('app'));
