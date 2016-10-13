import React from 'react';
import Search from './AutoComplete';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
    this.updateArtists = e => this.updateArtistArray(e)
  }

  updateArtistArray(artists) {
    let thiz = this;
    console.log("main state ar", artists)
    thiz.setState({artists: artists})
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
