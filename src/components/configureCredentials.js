import React from 'react';
import {getData} from '../persistence/persistence';

class ConfigureCredentialsComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      githubUsername: ''
    }
  }

  handleInput = (e) => {
    this.setState({githubUsername: e.target.value});
  }

  submit = () => {
    const data = getData(this.props.masterKey, this.state.githubUsername);
    if(data) {
      window.localStorage.credentials = JSON.stringify({
        githubUsername: this.state.githubUsername
      });
      this.props.onFinish();
    }
  }

  render() {
    return (
      <div className="masterkey">
        <h1 className="title is-3">Github Username</h1>
        <input type="text" value={this.state.githubUsername} onChange={this.handleInput} className="input is-primary" />
        <button className="button is-primary is-large masterkey-button" onClick={this.submit}>Search</button>
      </div>
    );
  }
}

export default ConfigureCredentialsComponent;