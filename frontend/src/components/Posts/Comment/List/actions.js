import {
  POST_COMMENTS_RECEIVED,
} from '../constants';
import {defaultHeaders} from '../../../utils'

const headers = defaultHeaders()
const BASE_URL = process.env.REACT_APP_BASE_URL

const fetchPostCommentsSuccess = comments => ({
  type: POST_COMMENTS_RECEIVED,
  comments
});

const fetchPostComments = (postId) => {
  return dispatch => {
    let url = `${BASE_URL}/posts/${postId}/comments`;

    return(
      fetch(url, {headers: headers})
        .then(res => res.json())
        .then(data => dispatch(fetchPostCommentsSuccess(data)))
        .catch(err => console.log(err))
    );
  };
};

export { fetchPostComments };