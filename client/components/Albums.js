import React, {Component} from 'react';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { fetchAlbums } from '../models/SpotApi'
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import MyComponent from './MyComponent';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router'

const spotyfySearch = `https://api.spotify.com/v1/artists/`;

class Albums extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	albums: [],
    	shadow: 1
    }

    // Add fancy hover effect to Paper elements
    this.onMouseOver = (e) => {
    	e.currentTarget.style = ` -webkit-box-shadow: -1px 10px 22px -4px rgba(135,135,135,1);
																-moz-box-shadow: -1px 10px 22px -4px rgba(135,135,135,1);
																box-shadow: -1px 10px 22px -4px rgba(135,135,135,1);`;
  	}
  	this.onMouseOut = (e) => {
	    e.currentTarget.style = `color: rgba(0, 0, 0, 0.870588); background-color: rgb(255, 255, 255); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; border-radius: 2px;`;
  	}

 		this.clicked = (e) => {

 			// Set the albumId into localstorage so the data persists if the user refreshes the page
			let albumID = e.currentTarget.getAttribute('id');
			localStorage.setItem("albumId", albumID);
			browserHistory.push('/album-info');
		}
  }

  fetchAlbums(){
  	const thiz = this;
  	// Use localstorage in case user refreshed the page
		let id = localStorage.getItem("artistId");
		const url = spotyfySearch + id + '/albums';
		
		// Get Albums from the Spotify API
	  fetchAlbums(url)
      .then(function(res) {
        let albumsArray = res.items;
        thiz.setState({
          albums: albumsArray
        });
      })
      .catch(function(err){
        console.log("could not resolve promise with error: ", err);
      })
  }

	componentDidMount(){
		this.fetchAlbums();
	}

  render(){
  	const thiz = this;

  	// Map over all the items in albumsList array and create Paper-cards with data
    let albumsList = this.state.albums
    	.map(function(album){
        return (
		      <Col key={album.id} sm={6} md={4}>
		      <div className="rows">

			      <Paper onClick={thiz.clicked} 
			      			 key={album.name} 
			      			 className='albums'
			      			 id={album.id}
			      			 onMouseOver={thiz.onMouseOver}
   							   onMouseOut={thiz.onMouseOut}
     							 zDepth={thiz.state.shadow}>
			      <div>
			      <img className="imgur" src={album.images[1].url}/>
						<h3 className="albumName">{album.name}</h3>
		        	</div>
	        	</Paper>
	        	</div>
		      </Col>
			  )
      });
  	
  	// Use material desing theme for view
  	return <MuiThemeProvider muiTheme={getMuiTheme()}>  	
			<Grid>
				<Row className="show-grid">{ albumsList }</Row></Grid>
  	</MuiThemeProvider>
  }
}

export default Albums;