import React, { Component } from 'react';
import './Header.css';
import { Button, ButtonGroup } from 'reactstrap';

export class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Gilson - Demo app</h1>
          <br/>
          <ButtonGroup>
            <Button onClick={() => this.props.history.push('/')} disabled={this.props.location.pathname === '/'} >Home</Button>
            <Button onClick={() => this.props.history.push('/showcase/0')} disabled={this.props.match.path === '/showcase/:page'} >Showcase</Button>
            <Button onClick={() => this.props.history.push('/about')} disabled={this.props.location.pathname === '/about'} >About me</Button>
          </ButtonGroup>
        </header>
      </div>
    );
  }
};
