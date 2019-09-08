import React from 'react';

class HomeComponent extends React.Component {
  render() {
    return (
      <div className="home">
        <h1 className="title is-3">home component</h1>
        <p>{this.props.masterKey}</p>
      </div>
    );
  }
}

export default HomeComponent;