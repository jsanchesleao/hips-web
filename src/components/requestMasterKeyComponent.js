import React from 'react';
import {getRsaKeys} from '../crypto/cryptography';

class RequestMasterKeyComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      masterKey: '',
      test: ''
    };
    this.crypto = JSON.parse(window.localStorage.hips);
  }

  handleInput = (e) => {
    this.setState({masterKey: e.target.value});
  }

  unlock = () => {
    getRsaKeys(this.state.masterKey).then(keys => {
      this.props.onFinish(this.state.masterKey);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="masterkey">
        <h1 className="title is-3">Enter Master Key</h1>
        <input type="password" value={this.state.masterKey} onChange={this.handleInput} className="input is-primary" />
        <button className="button is-primary is-large masterkey-button" onClick={this.unlock}>Unlock</button>
      </div>
    );
  }
}

export default RequestMasterKeyComponent;