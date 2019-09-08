import React from 'react';
import './App.css';
import 'bulma';
import KeyImporter from './components/keyImporter';
import RequestMasterKeyComponent from './components/requestMasterKeyComponent';
import HomeComponent from './components/homeComponent';

function hasImportedData() {
  return !!window.localStorage.hips;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasImportedData: hasImportedData(),
      masterKey: null
    }
  }

  dataImportedCallback = () => {
    this.setState({hasImportedData: true});
  }

  masterKeyCallback = (key) => {
    this.setState({masterKey: key});
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
    else {
      return <HomeComponent masterKey={this.state.masterKey}/>
    }
  }
}

export default App;
