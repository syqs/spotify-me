import React, {Component} from 'react';
import { AutoComplete }   from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import fetch              from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router'
import { fetchArtists } from '../models/SpotApi'

// Handles 300 millisecond delay on touch events
injectTapEventPlugin();

const spotyfySearch = `https://api.spotify.com/v1/search?q=`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ''
    };
    this.newRequest = e => this.onNewRequest(e);
  }

  // Updated the state with input values
  onUpdateInput(inputValue) {
    const thiz = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      thiz.performSearch();
    });
  }

  // Runs after user selects the artist from the dropdown
  onNewRequest(searchTerm) {
    const thiz = this;
    let artist = thiz.props.artists.filter(artist => artist.name.toLowerCase() === searchTerm.toLowerCase());
    localStorage.setItem("artistId", artist[0].id);
    browserHistory.push('/albums');
  }

  // Call Spotify API to get all the artists that contain letters typed in
  performSearch() {
    const
      thiz = this,
      url  = spotyfySearch + this.state.inputValue + '&type=artist&limit=10';

    if(this.state.inputValue !== '') {
      fetchArtists(url)
        .then(function(res) {
          let artistsName;
          let data = res.artists.items;

          // Map artists from the API call into an array and set the state in the main component
          artistsName = data.map(result => result.name );
          thiz.setState({
            dataSource: artistsName
          });
          thiz.props.upArtists(data);
        })
        .catch(function(err){
          console.log("could not resolve promise with error: ", err)
        })
    }
  }

  render() {

    // Use material desing component for UI rendering
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        className     = "theSearch" 
        hintText      = "Start typing artists name"
        dataSource    = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput} 
        onNewRequest  = {this.newRequest} 
        filter        = {AutoComplete.caseInsensitiveFilter}/>
      </MuiThemeProvider>
  }
}

export default Search;