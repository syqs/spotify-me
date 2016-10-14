import React from 'react';
import Search from './AutoComplete';
import Albums from './Albums';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import { Button, ButtonToolbar, Grid, Row, Col } from 'react-bootstrap';

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
    thiz.setState({artists: artists});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>    
      <Grid>
        <Row className="show-grid"> 
          <div className="container">
            <h2>Welcome to the only spotify app you will ever need!</h2>
            <Search upArtists={this.updateArtists} artists={this.state.artists}/> 
          </div>
        </Row>
      </Grid>
    </MuiThemeProvider>
    );
  }
} 
