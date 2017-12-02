import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


class CreatePost extends Component {
  render() {
    return (
      <Row>
        <Col md={8} style={{margin: 'auto'}}>
          <Form horizontal>
            <FormGroup controlId='postTitle'>
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <FormControl type='input' placeholder='Enter your title here.' />
              </Col>
            </FormGroup>
            <FormGroup controlId='postBody'>
              <Col sm={12}>
                <FormControl rows={8} componentClass='textarea' placeholder='Enter your post content here.' />
              </Col>
            </FormGroup>
            <Button default type="submit" style={{float: 'right'}}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default CreatePost;