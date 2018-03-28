import React, { Component } from 'react';
import { Header } from "../../components/Header/Header";
import './About.css';
import { Container, Row, Col, Tooltip } from 'reactstrap';
import brazil from './brazil.svg';
import portugal from './portugal.svg';
import linkedin from './linkedin.svg';
import facebook from './facebook.svg';
import gilson from './gilson.jpg';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipPortugalOpen: false,
      tooltipBrazilOpen: false,
    };
  }

  togglePortugal = () => {
    this.setState({ tooltipPortugalOpen: !this.state.tooltipPortugalOpen });
  }

  toggleBrazil = () => {
    this.setState({ tooltipBrazilOpen: !this.state.tooltipBrazilOpen });
  }

  render() {
    return (
      <div>
        <Header {...this.props} />

        <Container className="about">
          <Row>
            <Col sm="auto">
              <img src={gilson} alt="Gilson Marquato Júnior" className="photo" />

              <div className="info">
                <h2>Gilson Marquato Júnior</h2>

                <hr/>

                <p>
                  Fullstack developer from <a id="TooltipPortugal">Porto, Portugal</a>
                  <Tooltip placement="top" isOpen={this.state.tooltipPortugalOpen} target="TooltipPortugal" toggle={this.togglePortugal}>
                    <img src={portugal} width="100px" alt="Portugal" />
                  </Tooltip>
                </p>

                <p>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/gilson-marquato-jr/"><img src={linkedin} alt="Linkedin" /></a> <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/gilsonmjr"><img src={facebook} alt="Facebook" /></a>
                </p>
              </div>
            </Col>
            <Col className="bio">
              I'm a man natural from <a id="TooltipBrazil">Brazil</a>, a developer, gamer, adventurer who
              like to discover and learn new things and places. Feel free to message me and learn more about
              my work.
              <Tooltip placement="top" isOpen={this.state.tooltipBrazilOpen} target="TooltipBrazil" toggle={this.toggleBrazil}>
                <img src={brazil} width="100px" alt="Brazil" />
              </Tooltip>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};
