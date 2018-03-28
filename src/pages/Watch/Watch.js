import React, { Component } from 'react';
import { Header } from '../../components/Header/Header';
import { Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, 
  ListGroupItemText, Input, Button } from 'reactstrap';
import './Watch.css';
import gilson from '../About/gilson.jpg';

export default class Watch extends Component {
  constructor(props) {
    super(props);
    
    this.state = { comment: '' };
  }

  changeComment = event => {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <div>
        <Header {...this.props} />

        <Container className="watch">
          <Row>
            <Col sm="8">
              <video width="100%" controls poster="http://localhost:3000/thumb.jpg" >
                <source src="http://localhost:81/sample" />
                Your browser does not support the video tag.
              </video>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    <img src={gilson} alt="Gilson Marquato Júnior" className="avatar" /> Gilson Marquato Júnior
                  </ListGroupItemHeading>
                  <ListGroupItemText>Muito legal.</ListGroupItemText>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemHeading>
                    <img src={gilson} alt="Gilson Marquato Júnior" className="avatar" /> Luciano Urgal
                  </ListGroupItemHeading>
                  <ListGroupItemText>uheuhuhe</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>

              <br/>

              <Input type="textarea" placeholder="Add a comment" value={this.state.comment} onChange={this.changeComment} />
              <Button block color="primary" className="send" disabled={this.state.comment.length === 0} >Send</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <p><small className="text-muted">Data do vídeo</small></p>
              Descrição do vídeo {this.props.match.params.id}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
