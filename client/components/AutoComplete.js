import React, {Component} from 'react';
import { AutoComplete }   from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import fetch              from 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router'

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
    this.newRequest = e => this.onNewRequest(e)
  }

  onUpdateInput(inputValue) {
    const thiz = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      thiz.performSearch()
    });
  }

  onNewRequest(searchTerm) {
    const thiz = this;
    console.log("search term", searchTerm);
    let artist = thiz.props.artists.filter(artist => artist.name.toLowerCase() === searchTerm.toLowerCase())
    console.log("artist from array, ", artist)
    localStorage.setItem("artistId", artist[0].id)
    browserHistory.push('/albums')
  }

  performSearch() {
    const
      thiz = this,
      url  = spotyfySearch + this.state.inputValue + '&type=artist&limit=10';

    if(this.state.inputValue !== '') {
      fetch(url)
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(res) {
          let artistsName;
          let data = res.artists.items;
          console.log('this is data: ', data)
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
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        hintText = "Start typing artists name"
        dataSource    = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput} 
        onNewRequest  = {this.newRequest} 
        filter        = {AutoComplete.caseInsensitiveFilter}/>
      </MuiThemeProvider>
  }
}

export default Search;