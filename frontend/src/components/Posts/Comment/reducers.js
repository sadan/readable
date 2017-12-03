import { initialState } from '../../../initialState/initialState';
import { POST_COMMENTS_RECEIVED, COMMENT_VOTE_SUCCESS, CREATE_COMMENT_SUCCESS, UPDATE_COMMENT_SUCCESS } from './constants';

const postCommentsReducer = (state = initialState.postComments, action) => {
  switch(action.type) {
    case POST_COMMENTS_RECEIVED:
      return Object.assign(
        [], 
        state, 
        action.comments
      );

    case UPDATE_COMMENT_SUCCESS:
      return (
        Object.assign(
          [],
          state,
          state.map(comment => {
            return (
              Object.assign(
                {},
                comment,
                action.comment.id === comment.id ? action.comment : comment
              )
            )
          })
        )
      )
    
    case CREATE_COMMENT_SUCCESS:
      return Object.assign([], state, state.concat(action.comment))

    default:
      return state;
  }
};

export default postCommentsReducer;