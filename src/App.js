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
      masterKey: '',
    }
  }

  masterKeyCallback = (key) => {
    this.setState({masterKey: key});
  }

  lock = () => {
    this.setState({masterKey: ''});
  }

  importCallback = () => {
    this.setState({hasImportedData: true});
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
      return <KeyImporter callback={this.importCallback}/>
    }
    else if (!this.state.masterKey) {
      return <RequestMasterKeyComponent onFinish={this.masterKeyCallback} />
    }
    else {
      return <HomeComponent masterKey={this.state.masterKey} onLock={this.lock} />
    }
  }
}

export default App;
