import {
  POST_COMMENTS_RECEIVED,
} from '../../../../utils/constants';
import { fetchPostComments } from '../../../../utils/api';

const _fetchPostCommentsSuccess = comments => ({
  type: POST_COMMENTS_RECEIVED,
  comments
});

const _fetchPostComments = (postId) => {
  return dispatch => fetchPostComments(postId)
      .then(comments => dispatch(_fetchPostCommentsSuccess(comments)))
};

export { _fetchPostComments };