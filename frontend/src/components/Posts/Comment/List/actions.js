import {
  POST_COMMENTS_RECEIVED,
} from '../constants';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

const fetchPostCommentsSuccess = comments => ({
  type: POST_COMMENTS_RECEIVED,
  comments
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

export { fetchPostComments };