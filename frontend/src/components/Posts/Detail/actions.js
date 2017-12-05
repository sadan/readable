import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS,
  DELETE_POST_SUCCESS
 } from './constants';
 import isEmpty from 'lodash/isEmpty';
 import {defaultHeaders} from '../../utils'

const headers = defaultHeaders()
const BASE_URL = process.env.REACT_APP_BASE_URL

const fetchPostDetailSuccess = post => ({
  type: POST_DETAIL_RECEIVED,
  post
});

const postVoteSuccess = score => ({
  type: POST_VOTE_SUCCESS,
  score
});

const postVote = (postId, vote) => {
  return dispatch => {
    let url = `${BASE_URL}/posts/${postId}/`;
    
    let requestData = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: vote})
    }

    let request = new Request(url, requestData);

    return (
      fetch(request)
      .then(res => res.json())
      .then(data => dispatch(postVoteSuccess(data.voteScore)))
      .catch(err => console.log(err))
    );
  };
};

const fetchPostDetail = (postId) => {
  return dispatch => {
    let url = `${BASE_URL}/posts/${postId}`;

    return (
      fetch(url, {headers: headers})
      .then(res => res.json())
      .then(data => {
        dispatch(fetchPostDetailSuccess(data));

        // check if post exists/deleted
        if(isEmpty(data)) {
          return false
        } 
        return true
      })
      .catch(err => console.log(err))
    );
  };
};

const deletePost = (postId) => {
  return dispatch => {
    let url = `${BASE_URL}/posts/${postId}`;
    let requestData = {
      method: 'DELETE',
      headers: headers
    };
    let request = new Request(url, requestData);

    return (
      fetch(request)
        .then(res => res.json())
        .then(data => {return true;})
        .catch(err => console.log(err))
    )
  }
}

export { fetchPostDetail, postVote, deletePost };
