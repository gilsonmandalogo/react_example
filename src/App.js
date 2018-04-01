import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { Header } from "./components/Header/Header";
import './App.css';
import Showcase from './pages/Showcase/Showcase';
import Watch from './pages/Watch/Watch';
import Upload from './pages/Upload/Upload';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/showcase/:page" component={Showcase} />
          <Route path="/watch/:id" component={Watch} />
          <Route path="/upload" component={Upload} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Header {...this.props} />

        <h3 className="error">
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    );
  }
}
