import { initialState } from '../../../initialState/initialState';
import { POST_COMMENTS_RECEIVED, COMMENT_VOTE_SUCCESS } from './constants';

const postCommentsReducer = (state = initialState.postComments, action) => {
  switch(action.type) {
    case POST_COMMENTS_RECEIVED:
      return Object.assign(
        [], 
        state, 
        action.comments
      );

    case COMMENT_VOTE_SUCCESS:
      let updatedCommentId = action.comment.id;

      return (
        Object.assign(
          [],
          state,
          state.map(comment => {
            return (
              Object.assign(
                {},
                comment,
                {
                  ...comment,
                  voteScore: comment.id === updatedCommentId ? action.comment.voteScore : comment.voteScore
                }
              )
            )
          })
        )
      )

    default:
      return state;
  }
};

export default postCommentsReducer;