import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS,
  DELETE_POST_SUCCESS
 } from './constants';
 import isEmpty from 'lodash/isEmpty';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

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
    let url = `http://localhost:3001/posts/${postId}/`;
    
    let requestData = {
      method: 'POST',
      headers: defaultHeader,
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
    let url = `http://localhost:3001/posts/${postId}`;

    return (
      fetch(url, {headers: defaultHeader})
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
    let url = `http://localhost:3001/posts/${postId}`;
    let requestData = {
      method: 'DELETE',
      headers: defaultHeader
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
