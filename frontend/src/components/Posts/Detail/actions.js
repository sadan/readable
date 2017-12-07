import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS
 } from '../../../utils/constants';
import isEmpty from 'lodash/isEmpty';
import { fetchPostDetail, postVote } from '../../../utils/api';

const getPostDetailSuccess = post => ({
  type: POST_DETAIL_RECEIVED,
  post
});

const savePostVoteSuccess = score => ({
  type: POST_VOTE_SUCCESS,
  score
});

const savePostVote = (postId, vote) => {
  return dispatch => 
    postVote(postId, vote)
      .then(post => dispatch(savePostVoteSuccess(post.voteScore)))
};

const getPostDetail = (postId) => {
  return dispatch =>
    fetchPostDetail(postId)
      .then(post => {
        dispatch(getPostDetailSuccess(post));
  
        // check if post exists/deleted
        if(isEmpty(post)) {
          return false
        }
        return true
      })
};

export { getPostDetail, savePostVote };
