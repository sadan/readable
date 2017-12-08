import { 
  UPDATE_COMMENT_SUCCESS, 
  CREATE_COMMENT_SUCCESS 
} from '../../../../utils/constants'
import { createUpdateComment } from '../../../../utils/api'

const _createCommentSuccess = comment => ({
  type: CREATE_COMMENT_SUCCESS,
  comment
});

const _updateCommentSuccess = comment => ({
  type: UPDATE_COMMENT_SUCCESS,
  comment
});

const _createUpdateComment = (params, update) => {
  return dispatch => {
    return createUpdateComment(params, update)
      .then(comment => {
        update
        ? dispatch(_updateCommentSuccess(comment))
        : dispatch(_createCommentSuccess(comment))
      })
  }
};

export { _createUpdateComment };
