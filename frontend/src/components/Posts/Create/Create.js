import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import AutoComplete from 'react-autocomplete';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { fetchCategories } from '../../Home/CategoriesList/actions';
import { createPost } from './actions';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {
        id: uuidv1(),
        timestamp: Date.now(),
        title: '',
        body: '',
        author: '',
        category: ''
      },
      created: false,
      update: false,
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCategories, categories, location } = this.props;

    if (!categories.length) fetchCategories();
    if (!isEmpty(location.state)) {
      this.setState({ post: location.state.post, update: true })
    }
  }

  onValueChange(e) {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit(e) {
    let { createPost } = this.props;
    let {post, update} = this.state;

    e.preventDefault();

    createPost(post, update)
      .then(created => {
        if(created) {
          this.setState({ created });
        }
      });
  }

  render() {
    let {post, created, update} = this.state;
    let { categories } = this.props;

    if (created) return <Redirect to={`/posts/${post.category}/${post.id}`} />;

    return (
      <Row>
        <Col md={8} mdOffset={2} style={{margin: '0 auto'}}>
          <Form 
            horizontal
            onSubmit={this.onSubmit}>
            <FormGroup controlId='postTitle'>
              <Col componentClass={ControlLabel} md={2} sm={12}>
                Title
              </Col>
              <Col md={10} sm={12}>
                <FormControl 
                  type='input'
                  name='title'
                  value={post.title}
                  onChange={this.onValueChange}
                  placeholder='Enter your title here.' />
              </Col>
            </FormGroup>
            <FormGroup controlId='postBody'>
              <Col sm={12}>
                <FormControl 
                  rows={8} 
                  componentClass='textarea' 
                  name='body'
                  value={post.body}
                  onChange={this.onValueChange}
                  placeholder='Enter your post content here.' />
              </Col>
            </FormGroup>
            <FormGroup controlId='category'>
              <Col componentClass={ControlLabel} md={2} sm={12}>
                Category
              </Col>
              <Col md={4} sm={12}>
                {!update
                  ?
                  <div className='category-ac'>
                    <AutoComplete
                      name='category'
                      getItemValue={(i) => i.name}
                      items={categories}
                      renderItem={(i, isHighlighted) => 
                        <div style={{ background: isHighlighted ? 'lightgray': 'white'}}>
                          {i.name}
                        </div>
                      }
                      value={post.category}
                      onSelect={(v) => {
                        this.setState({
                          post: { 
                            ...post,
                            category: v 
                          }
                        })
                      }}
                    />
                  </div>
                  : <div className='text-muted' style={{paddingTop: '7px'}}>{post.category}</div>}
              </Col>
              <Col componentClass={ControlLabel} md={2} sm={12}>
                Author
              </Col>
              <Col md={4} sm={12}>
                {!update 
                  ?
                  <FormControl
                    type='input'
                    name='author'
                    value={post.author}
                    onChange={this.onValueChange}
                    placeholder='Enter your name'
                  />
                  : <div className='text-muted' style={{paddingTop: '7px'}}>{post.author}</div>}
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

let mapStateToProps = state => ({
  categories: state.categories.list
});

let mapDispatchToProps = {
  fetchCategories,
  createPost
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);