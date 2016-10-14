import React, {Component} from 'react';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import MyComponent from './MyComponent';

class Albums extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	artists: []
    }
  }

	componentDidMount(){
		let id = localStorage.getItem("artistId")
		console.log("this is artist id", id)
	}

  render(){
  	console.log("states d", this.state.artists)
  	let names = ['Jake', 'Jon', 'Thruster'];
    let namesList = names
    	.map(function(name){
        return (
        	<Paper className='col-4' zDepth={1}>
        	<div><h2>{name}</h2></div>
        	</Paper>
			  )
      });
  	
  	return <MuiThemeProvider muiTheme={getMuiTheme()}>  	
			<ul>{ namesList }</ul>
  	</MuiThemeProvider>
  }
}

export default Albums;