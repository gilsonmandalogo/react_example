import React, { Component } from 'react';
import { Header } from '../../components/Header/Header';
import { Card, CardImg, CardTitle, CardText, CardGroup, CardBody, CardFooter,
  Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import './Showcase.css';
import { Link } from "react-router-dom";
import no_thumb from './no_thumb.svg';

export default class Showcase extends Component {
  _initState = {
    loading: true,
    data: null,
  }

  constructor(props) {
    super(props);
    
    this.state = this._initState;
  }

  previousPageLink = () => {
    this.props.history.push('/showcase/' + (parseInt(this.props.match.params.page, 0) - 1));
    this.setState(this._initState);
  }

  nextPageLink = () => {
    this.props.history.push('/showcase/' + (parseInt(this.props.match.params.page, 0) + 1));
    this.setState(this._initState);
  }

  goPageLink = page => {
    this.props.history.push('/showcase/' + page);
    this.setState(this._initState);
  }

  loadVideos = () => {
    fetch('http://localhost/api/video?page=' + this.props.match.params.page)
    .then(res => {
      res.json().then(data => this.setState({ loading: false, data }));
    });
  }

  renderLoading = () => {
    return (
      <div>
        <Header {...this.props} />

        <p>Loading...</p>
      </div>
    );
  }
  
  renderCards = documents => {
    const cards = [];    

    documents.forEach(document => {
      const date = new Date(document.date);
      const video_thumb = document.thumb ? document.thumb : no_thumb;

      cards.push(
        <Card key={document._id} className="video" >
          <Link className="link" to={'/watch/' + document._id} >
            <CardImg top className="video-thumb" src={video_thumb} alt="Video thumbnail" />
            <CardBody className="video-desc-body" >
              <CardTitle>{document.title}</CardTitle>
              <CardText className="video-desc" >{document.desc}</CardText>
            </CardBody>
            <CardFooter className="text-muted">
              {`${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}`}
            </CardFooter>
          </Link>
        </Card>
      );
    });

    return cards;
  }

  renderPagination = () => {
    const pages = [];    

    for (let index = 0; index < Math.floor(this.state.data.count / 9) +1; index++) {
      pages.push(
        <PaginationItem active={this.state.data.page === index} key={index} >
          <PaginationLink onClick={() => this.goPageLink(index)} >{index +1}</PaginationLink>
        </PaginationItem>
      );
    };

    return pages;
  }

  renderVideos = () => {
    return (
      <div>
        <Header {...this.props} />

        <div className="mx-auto deck" >
          <Link to="/upload" ><Button outline color="primary" >Upload</Button></Link>
        </div>

        <CardGroup className="mx-auto deck" hidden={this.state.data.documents.length === 0} >
          {this.renderCards(this.state.data.documents.slice(0, 3))}
        </CardGroup>
        <CardGroup className="mx-auto deck" hidden={this.state.data.documents.length <= 3} >
          {this.renderCards(this.state.data.documents.slice(3, 6))}
        </CardGroup>
        <CardGroup className="mx-auto deck" hidden={this.state.data.documents.length <= 6} >
          {this.renderCards(this.state.data.documents.slice(6, 9))}
        </CardGroup>

        <div className="mx-auto deck footer" >
          Showing {this.state.data.documents.length} of {this.state.data.count} videos

          <Pagination>
            <PaginationItem disabled={this.state.data.page === 0} >
              <PaginationLink previous onClick={this.previousPageLink} />
            </PaginationItem>
            {this.renderPagination()}
            <PaginationItem disabled={(this.state.data.page + 1) * 9 >= this.state.data.count} >
              <PaginationLink next onClick={this.nextPageLink} />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading === true) {
      this.loadVideos();
      return this.renderLoading();
    };

    return this.renderVideos();
  }
}
