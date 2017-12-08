import { 
  POST_DETAIL_RECEIVED,
  POST_VOTE_SUCCESS
 } from '../../../utils/constants';
import isEmpty from 'lodash/isEmpty';
import { fetchPostDetail, postVote } from '../../../utils/api';

const _fetchPostDetailSuccess = post => ({
  type: POST_DETAIL_RECEIVED,
  post
});

const _postVoteSuccess = score => ({
  type: POST_VOTE_SUCCESS,
  score
});

const _postVote = (postId, vote) => {
  return dispatch => 
    postVote(postId, vote)
      .then(post => dispatch(_postVoteSuccess(post.voteScore)))
};

const _fetchPostDetail = (postId) => {
  return dispatch =>
    fetchPostDetail(postId)
      .then(post => {
        dispatch(_fetchPostDetailSuccess(post));
  
        // check if post exists/deleted
        if(isEmpty(post)) {
          return false
        }
        return true
      })
};

export { _fetchPostDetail, _postVote };
