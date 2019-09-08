import React from 'react';
import './App.css';
import 'bulma';
import KeyImporter from './components/keyImporter';
import RequestMasterKeyComponent from './components/requestMasterKeyComponent';
import ConfigureCredentialsComponent from './components/configureCredentials';
import HomeComponent from './components/homeComponent';

function hasImportedData() {
  return !!window.localStorage.hips;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasImportedData: hasImportedData(),
      masterKey: '',
      credentials: loadCredentials()
    }
  }

  dataImportedCallback = () => {
    this.setState({hasImportedData: true});
  }

  masterKeyCallback = (key) => {
    this.setState({masterKey: key});
  }

  credentialsCallback = () => {
    this.setState({credentials: loadCredentials()});
  }

  render() {
    return (
      <div className="app">
        {this.renderPage()}
      </div>
    );
  }

  renderPage() {
    if(!this.state.hasImportedData) {
      return <KeyImporter onImport={this.dataImportedCallback} />
    }
    else if (!this.state.masterKey) {
      return <RequestMasterKeyComponent onFinish={this.masterKeyCallback} />
    }
    else if (!this.state.credentials) {
      return <ConfigureCredentialsComponent masterKey={this.state.masterKey} onFinish={this.credentialsCallback} />
    }
    else {
      return <HomeComponent masterKey={this.state.masterKey} credentials={this.state.credentials}/>
    }
  }
}

function loadCredentials() {
  try{
    return JSON.parse(window.localStorage.credentials)
  }
  catch(err) {
    return null;
  }
}

export default App;
