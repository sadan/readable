import {
  UPDATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS
} from '../constants';
import {defaultHeaders} from '../../../utils'

const headers = defaultHeaders()
const BASE_URL = process.env.REACT_APP_BASE_URL

const commentVoteSuccess = comment => ({
  type: UPDATE_COMMENT_SUCCESS,
  comment
});

const deleteCommentSuccess = comment => ({
  type: DELETE_COMMENT_SUCCESS,
  comment
});

const commentVote = (commentId, vote) => {
  return dispatch => {
    let url = `${BASE_URL}/comments/${commentId}/`;
    
    let requestData = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: vote})
    }

    let request = new Request(url, requestData);

    return (
      fetch(request)
        .then(res => res.json())
        .then(data => dispatch(commentVoteSuccess(data)))
        .catch(err => console.log(err))
    );
  };
};

const deleteComment = (commentId) => {
  return dispatch => {
    let url = `${BASE_URL}/comments/${commentId}/`;
    
    let requestData = {
      method: 'DELETE',
      headers: headers
    };

    let request = new Request(url, requestData);

    return (
      fetch(request)
        .then(res => res.json())
        .then(data => dispatch(deleteCommentSuccess(data)))
        .catch(err => console.log(err))
    );
  };
};

export { commentVote, deleteComment };