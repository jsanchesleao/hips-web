import React from 'react';
import {getGistById} from '../persistence/persistence';

class KeyImporter extends React.Component {

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      gistId: urlParams.get('gistId'),
      error: null
    }
  }

  componentDidMount() {
    getGistById(this.state.gistId)
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

  render() {
    return (
      <div className="importer">
        <h1 className="title is-3">We are importing your data</h1>
        <p>Please wait</p>
        {this.state.error && (
          <pre>{this.state.error}</pre>
        )}
      </div>
    )
  }
}

export default KeyImporter;