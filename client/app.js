import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './components/MyComponent';
import AutoComplete from './components/AutoComplete';
import Albums from './components/Albums';
import AlbumInfo from './components/AlbumInfo';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Import compiled SASS
require('./sass/app.sass');
// <MyComponent title="Welcome to my app!" />, 
ReactDOM.render(
	(
		<Router history={browserHistory}>
    	<Route path="/" component={MyComponent}/>
    	<Route path="/mix" component={AutoComplete}/>
    	<Route path="/albums" component={Albums}/>
    	<Route path="/album-info" component={AlbumInfo}/>
  	</Router>
  ), window.document.getElementById('app'));


/// remeber to --save react-bootstrap