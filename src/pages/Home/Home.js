import React, { Component } from 'react';
import { Header } from "../../components/Header/Header";
import { Jumbotron, Button, Collapse, CardBody, Card } from 'reactstrap';

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = { collapse: false };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div>
        <Header {...this.props} />
        
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">This is a simple app showing some functionalities.</p>
          <hr className="my-2" />
          <p>It uses React Js, Node.js and MongoDb.</p>
          <p className="lead">
            <Button color="primary" onClick={this.toggle} >Learn More</Button>
          </p>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <p>This app uses 3 tier architecture.</p>

                <p>The front-end is React Js, and can be run in a simple http server.</p>

                <p>
                  The server-side uses Node.js to be the middleware, it validate some informations
                  received, and make much easy to integrate new type of front-end (like an mobile
                  App, or a third part App).
                </p>

                <p>
                  The database is the MongoDb, and it's accessible only by the middleware (Node.js)
                  for security reasons :)
                </p>
              </CardBody>
            </Card>
          </Collapse>
        </Jumbotron>
      </div>
    );
  }
};
