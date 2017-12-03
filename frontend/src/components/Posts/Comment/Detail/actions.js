import {
  UPDATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS
} from '../constants';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

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
    let url = `http://localhost:3001/comments/${commentId}/`;
    
    let requestData = {
      method: 'POST',
      headers: defaultHeader,
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
    let url = `http://localhost:3001/comments/${commentId}/`;
    
    let requestData = {
      method: 'DELETE',
      headers: defaultHeader
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