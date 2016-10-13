import React from 'react';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="my-component">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}
