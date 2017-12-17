import React, { Component } from 'react';
import { 
  Form, 
  FormGroup, 
  FormControl, 
  Button, 
  Col, 
  Row, 
} from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import { connect } from 'react-redux';

import { _createUpdateComment } from './actions';
import CommentDetail from '../Detail/CommentDetail';

class CreateComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayForm: false,
      update: false,
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

  componentDidMount() {
    if (this.props.comment) this.setState({ displayForm: true, comment: this.props.comment, update: true })
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
    let { _createUpdateComment, postId } = this.props;
    e.preventDefault();

    let {comment, update} = this.state;
    _createUpdateComment(comment, update);

    if (!update) {
      comment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: '',
        author: '',
        parentId: postId
      }
    }

    this.setState({ comment, displayForm: false})
  }

  displayForm() {
    this.setState({ displayForm: true })
  }

  render() {
    let { displayForm, comment, update } = this.state;

    if (!displayForm && update) return <CommentDetail comment={comment} />

    return (
      <Row>
        <Col md={12}>
          <Col md={12}>
            {
              !displayForm 
              ? 
              <div onClick={this.displayForm} className='add-comment-btn'>
                Add a comment
              </div> 
              : 
              <Form onSubmit={this.submitHandler} style={{marginTop: '15px', marginLeft: '20px'}}>
                <Col md={6} sm={12} componentClass={FormGroup}>
                  <FormControl 
                    type='text' 
                    placeholder='Enter you comment'
                    name='body'
                    value={comment.body}
                    onChange={this.onValueChange} />
                </Col>
                <Col md={2} sm={12} componentClass={FormGroup}>
                  {!update
                    ?
                    <FormControl 
                    type='text' 
                    placeholder='Enter you name'
                    name='author'
                    value={comment.author}
                    onChange={this.onValueChange} />
                    : <div className='text-muted' style={{paddingTop: '7px'}}>By {comment.author}</div>}
                </Col>
                <Button bsStyle='primary' type="submit">
                  Submit
                </Button>
              </Form>}
          </Col>
        </Col>
      </Row>
    );
  }
}

let mapDispatchToProps = {
  _createUpdateComment
}

export default connect(null, mapDispatchToProps)(CreateComment);
