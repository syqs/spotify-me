import React, {Component} from 'react';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import MyComponent from './MyComponent';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { fetchAlbumDetails } from '../models/SpotApi';
import ReactAudioPlayer from 'react-audio-player';

const spotyfySearch = `https://api.spotify.com/v1/albums/`;

class Albums extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	albumTracks: [],
    	shadow: 1,
    	fullInfo: {}
    }
  }

  // Get the albums from the Spotify
  fetchAlbums(){
  	const thiz = this;

  	// Set the albumId into storage in case user refreshes the page
  	// data persists
		let id = localStorage.getItem("albumId")
		console.log("this is album id", id)
		const url = spotyfySearch + id
	  fetchAlbumDetails(url)
      .then(function(res) {
        let albumTracks = res.tracks.items;
        console.log("res", res)
        thiz.setState({
          albumTracks: albumTracks,
          fullInfo: res
        });
      })
      .catch(function(err){
        console.log("could not resolve promise with error: ", err)
      });
  };

  // Converts miliseconds to usable user-friendly time object
  convertMS(ms) {
	  var d, h, m, s;
	  s = Math.floor(ms / 1000);
	  m = Math.floor(s / 60);
	  s = s % 60;
	  h = Math.floor(m / 60);
	  m = m % 60;
	  d = Math.floor(h / 24);
	  h = h % 24;
	  return { d: d, h: h, m: m, s: s };
	};

	componentDidMount(){
		this.fetchAlbums();
	}

  render(){
  	const thiz = this;
  	
  	// Map the tracks to an array
    let tracksList = this.state.albumTracks
    	.map(function(track){

    		// Convert the time in ms using helper function
    		let time = thiz.convertMS(track.duration_ms);
        return (
        	// Bootstrap the view
		      <Col key={track.id} sm={12} md={6} lg={4}>
		      <div className="rows">
							<Card>
							<CardHeader
						      title={track.artists[0].name}
						      subtitle={thiz.state.fullInfo.name}
						      avatar={thiz.state.fullInfo.images[2].url}
						      className="albumDetails" 
						    />
						    <CardTitle title={track.name}/>
						    <CardText>
						      <p>Artist: {track.artists[0].name}</p>
						      <p>Duration: {time.m} minutes and {time.s} seconds</p>
						    </CardText>
						    <CardActions>
						      <ReactAudioPlayer
									  src={track.preview_url}
									/>
									<p>Listen to the whole song on Spotify: {<a href={track.external_urls.spotify} target="_blank">Link</a>}</p>
						    </CardActions>

						  </Card>
	        	</div>
		      </Col>
			  )
      });

  	// Use material desing UI
  	return <MuiThemeProvider muiTheme={getMuiTheme()}>  	
			<Grid>
				<Row className="show-grid">{ tracksList }</Row></Grid>
  	</MuiThemeProvider>
  }
}

export default Albums;