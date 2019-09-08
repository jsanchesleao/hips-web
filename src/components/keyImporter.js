import React from 'react';

class KeyImporter extends React.Component {

  constructor() {
    super();
    this.state = {
      address: 'localhost'
    };
  }
  
  importKeys = () => {
    fetch(`http://${this.state.address}:8000/keys`)
      .then(result => result.json())
      .then(json => {
        window.localStorage.hips = JSON.stringify(json);
        this.props.onImport();
      })
  }

  changeAddress = (e) => {
    this.setState({address: e.target.value});
  }

  render() {
    return (
      <div className="importer">
        <p>To import the keys, run <span className="code">hips export-key</span> on the console in your computer, and enter here the IP address or the DNS name of the computer.</p>
        <input
            id="address-input"
            className="input is-primary importer-input"
            placeholder="Address"
            value={this.state.address}
            onChange={this.changeAddress} />
          <button 
            className="button is-primary importer-button" 
            onClick={this.importKeys}>Import</button>
      </div>
    )
  }
}

export default KeyImporter;