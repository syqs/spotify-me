import React from 'react';
import Search from './AutoComplete';
import Albums from './Albums';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      chosenArtistId: ''
    };
    this.updateArtists = e => this.updateArtistArray(e);
  }

  updateArtistArray(artists) {
    let thiz = this;
    console.log("main state ar", artists)
    thiz.setState({artists: artists})
  }

  getLocation(){
    let loc = location.href;
    loc = loc.slice(loc.indexOf('4000/')+5)
    console.log("this is loc, ",loc)
  }

  componentDidMount(){
    this.getLocation();
  }

  render() {
    return (
      <div className="container">
      <h2>Welcome to the only spotify app you will ever need!</h2>
        <Search upArtists={this.updateArtists} artists={this.state.artists}/> 
      </div>
    );
  }
} 
