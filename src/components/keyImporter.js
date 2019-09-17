import React from 'react';
import {getGistById} from '../persistence/persistence';

class KeyImporter extends React.Component {

  constructor() {
    super();
    this.state = {
      importStarted: false,
      error: null
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const gistId = urlParams.get('gistId')
    if (gistId) {
      this.doImport(gistId);
    }
  }

  doImport(gistId) {
    this.setState({importStarted: true});
    getGistById(gistId)
    .then(gist => {
      window.localStorage.username = gist.owner.login
      window.localStorage.hips = gist.files['hips_data'].content;
      this.props.callback();
    })
    .catch(err => {
      console.log(err);
      this.setState({error: err.stack})
    });
  }

  handleInput = e => {
    this.setState({gistId: e.target.value});
  }

  handleSubmit = () => {
    this.doImport(this.state.gistId);
  }

  renderInputScreen() {
    return (
      <div className="importer">
        <h1 className="title is-3">Enter ID from CLI:</h1>
        <input type="text" value={this.state.gistId} onChange={this.handleInput} className="input is-primary" />
        <button className="button is-primary is-large importer-button" onClick={this.handleSubmit}>Import</button>
      </div>
    )
  }

  renderWaitingScreen() {
    return (
      <div className="importer">
        <h1 className="title is-3">We are importing your data</h1>
        <p>Please wait</p>
        {this.state.error && (
          <p>{this.state.error}</p>
        )}
      </div>
    )
  }

  render() {
    if (this.state.importStarted) {
      return this.renderWaitingScreen();
    }
    else {
      return this.renderInputScreen();
    }
  }
}

export default KeyImporter;