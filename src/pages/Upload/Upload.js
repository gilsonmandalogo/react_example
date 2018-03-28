import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import { Header } from '../../components/Header/Header';
import './Upload.css';

export default class Upload extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      video: undefined,
      thumb: undefined,
      desc: '',
      error: '',
      res: '',
      uploadDisabled: false,
    };
  }

  changeTitle = event => {
    this.setState({ title: event.target.value });
  }

  changeVideo = event => {
    this.setState({ video: event.target.files[0] });
  }

  changeThumb = event => {
    this.setState({ thumb: event.target.files[0] });
  }

  changeDesc = event => {
    this.setState({ desc: event.target.value });
  }

  uploadDisabled = () => {
    return this.state.uploadDisabled || this.state.title.length === 0 || this.state.desc.length === 0 || this.state.video === undefined;
  };

  upload = () => {
    this.setState({
      error: '',
      res: '',
      uploadDisabled: true,
    });

    if (this.state.thumb) {
      const reader = new FileReader();
      reader.readAsDataURL(this.state.thumb);
      reader.onload = () => this.sendData(reader.result);
    } else {
      this.sendData();
    }
  }

  sendData = thumb => {
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('video', this.state.video);    
    formData.append('desc', this.state.desc);

    if (thumb) {
      formData.append('thumb', thumb);
    };

    fetch('http://localhost/api/video', {
      method: 'POST',
      body: formData,
    })
    .then(res => {
      if (res.status === 201) {
        res.text().then(value => {
          this.setState({ res: value, uploadDisabled: false });
        });
      } else {
        this.setState({ error: res.status + ' - ' + res.statusText, uploadDisabled: false });
      };
    })
    .catch(err => {
      this.setState({ error: err.message, uploadDisabled: false });
    });
  }

  render() {
    return (
      <div>
        <Header {...this.props} />

        <div className="upload" >
          <Form>
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col sm={10}>
                <Input invalid={this.state.title.length === 0} type="text" id="title" placeholder="Video title" onChange={this.changeTitle} value={this.state.title} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="video" sm={2}>Video</Label>
              <Col sm={10}>
                <Input invalid={this.state.video === null} type="file" id="video" accept="video/mp4, video/ogg, video/webm" onChange={this.changeVideo} />
                <FormText color="muted">Only videos in MP4, Ogg or WebM format</FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="thumb" sm={2}>Thumbnail</Label>
              <Col sm={10}>
                <Input type="file" id="thumb" accept="image/*" onChange={this.changeThumb} />
                <FormText color="muted">
                  This will show while user don't play the video, and on search results
                </FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="desc" sm={2}>Description</Label>
              <Col sm={10}>
                <Input invalid={this.state.desc.length === 0} type="textarea" id="desc" placeholder="Video description" onChange={this.changeDesc} value={this.state.desc} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={10}>
                <Button color="primary" disabled={this.uploadDisabled()} onClick={this.upload} >Upload</Button>
              </Col>
            </FormGroup>
          </Form>

          <Alert hidden={this.state.error.length === 0} color="danger">{this.state.error}</Alert>
          <Alert hidden={this.state.res.length === 0} color="success">{this.state.res}</Alert>
        </div>
      </div>
    );
  }
}
