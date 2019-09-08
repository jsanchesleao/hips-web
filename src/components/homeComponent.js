import React from 'react';
import {getData} from '../persistence/persistence';
import Clipboard from 'react-clipboard.js';

class HomeComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      passwords: [],
      selected: ']`(qL5-,jfEp*ddM'
    };
  }

  componentDidMount() {
    getData(this.props.masterKey, this.props.credentials.githubUsername).then(data => {
      this.setState({passwords: data.passwords})
    });
  }

  select = (p) => () => {
    this.setState({selected: p.password});
  }

  onSelect = (p) => () => {
    alert(`password ${p.name} copied to the clipboard`);
  }

  reset = () => {
    delete window.localStorage.hips;
    delete window.localStorage.gistId;
    delete window.localStorage.credentials;
    window.location.reload();
  }


  render() {
    return (
      <React.Fragment>
        <div className="home">
          <h1 className="title is-3 home-title">Stored Passwords</h1>
          <div className="home-passwords">
            {this.state.passwords.map(p => (
                <Clipboard className="button home-button is-primary" data-clipboard-text={p.password} onSuccess={this.onSelect(p)}>
                  {p.name}
                </Clipboard>
            ))}
          </div>
        </div>
        <div className="reset-wrapper">
          <button className="button home-reset is-danger is-fullwidth" onClick={this.reset}>reset</button>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeComponent;