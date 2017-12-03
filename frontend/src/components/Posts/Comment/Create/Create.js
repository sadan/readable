import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button, Col, Row, ControlLabel } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';

import { createComment } from './actions';

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayForm: false,
      comment: {
        id: uuidv1(),
        timestamp: Date.now(),
        body: '',
        author: '',
        parentId: props.postId
      }
    };

    this.displayForm = this.displayForm.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onValueChange(e) {
    e.preventDefault();

    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value
      }
    })
  }

  submitHandler(e) {
    let { createComment } = this.props;
    e.preventDefault();

    let {comment} = this.state;
    createComment(comment);

    this.setState({ displayForm: false })
  }

  displayForm() {
    this.setState({ displayForm: true })
  }

  render() {
    let { displayForm, comment } = this.state;

    return (
      <Row>
        {
          !displayForm 
          ? 
          <span onClick={this.displayForm} className='add-comment-btn'>
            Add a comment
          </span> 
          : 
          <Form onSubmit={this.submitHandler} style={{marginTop: '15px', marginLeft: '30px'}}>
            <Col md={6} sm={12} componentClass={FormGroup}>
              <FormControl 
                type='text' 
                placeholder='Enter you comment'
                name='body'
                value={comment.body}
                onChange={this.onValueChange} />
            </Col>
            <Col md={2} sm={12} componentClass={FormGroup}>
              <FormControl 
              type='text' 
              placeholder='Enter you name'
              name='author'
              value={comment.author}
              onChange={this.onValueChange} />
            </Col>
            <Button bsStyle='primary' type="submit">
              Submit
            </Button>
          </Form>}
      </Row>
    );
  }
}

let mapStateToProps = state => ({

})

let mapDispatchToProps = {
  createComment
}

export default connect(null, mapDispatchToProps)(CreateComment);
