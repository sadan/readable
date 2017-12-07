import {
  UPDATE_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS
} from '../../../../utils/constants'
import { commentVote, deleteComment } from '../../../../utils/api'

const _commentVoteSuccess = comment => ({
  type: UPDATE_COMMENT_SUCCESS,
  comment
});

const _deleteCommentSuccess = comment => ({
  type: DELETE_COMMENT_SUCCESS,
  comment
});

const _commentVote = (commentId, vote) => {
  return dispatch => commentVote(commentId, vote)
      .then(comment => dispatch(_commentVoteSuccess(comment)))
}

const _deleteComment = (commentId) => {
  return dispatch => deleteComment(commentId)
      .then(comment => dispatch(_deleteCommentSuccess(comment)))
};

export { _commentVote, _deleteComment };