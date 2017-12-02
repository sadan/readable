import {
  POST_COMMENTS_RECEIVED,
  COMMENT_VOTE_SUCCESS
} from './constants';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

const fetchPostCommentsSuccess = comments => ({
  type: POST_COMMENTS_RECEIVED,
  comments
});

const commentVoteSuccess = comment => ({
  type: COMMENT_VOTE_SUCCESS,
  comment
});

const fetchPostComments = (postId) => {
  return dispatch => {
    let url = `http://localhost:3001/posts/${postId}/comments`;

    return(
      fetch(url, {headers: defaultHeader})
      .then(res => res.json())
      .then(data => dispatch(fetchPostCommentsSuccess(data)))
      .catch(err => console.log(err))
    );
  };
};

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

export { fetchPostComments, commentVote };