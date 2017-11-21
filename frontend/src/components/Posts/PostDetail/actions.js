import { POST_DETAIL_RECEIVED, POST_COMMENTS_RECEIVED } from './constants';

const defaultHeader = {Authorization: 'boohoo43'};

const postDetailSuccess = post => ({
  type: POST_DETAIL_RECEIVED,
  post
});

const postCommentsSuccess = comments => ({
  type: POST_COMMENTS_RECEIVED,
  comments
});

const fetchPostComments = (postId) => {
  return dispatch => {
    let url = `http://localhost:3001/posts/${postId}/comments`;

    return(
      fetch(url, {headers: defaultHeader})
      .then(res => res.json())
      .then(data => dispatch(postCommentsSuccess(data)))
      .catch(err => console.log(err))
    )
  }
}

const fetchPostDetail = (postId) => {
  return dispatch => {
    let url = `http://localhost:3001/posts/${postId}`;

    return (
      fetch(url, {headers: defaultHeader})
      .then(res => res.json())
      .then(data => {
        dispatch(postDetailSuccess(data));
        dispatch(fetchPostComments(postId));
      })
      .catch(err => console.log(err))
    );
  };
};

export { fetchPostDetail };
