import { initialState } from '../../../initialState/initialState';
import { 
  POST_COMMENTS_RECEIVED, 
  DELETE_COMMENT_SUCCESS, 
  CREATE_COMMENT_SUCCESS, 
  UPDATE_COMMENT_SUCCESS 
} from '../../../utils/constants';

const postCommentsReducer = (state = initialState.postComments, action) => {
  switch(action.type) {
    case POST_COMMENTS_RECEIVED:
      return [
        ...state,
        ...action.comments
      ]

    case UPDATE_COMMENT_SUCCESS:
      return [
        ...state.map(comment => (
          action.comment.id === comment.id ? action.comment : comment
        ))
      ]
    
    case CREATE_COMMENT_SUCCESS:
      return [
        ...state,
        action.comment
      ]

    case DELETE_COMMENT_SUCCESS:
      return state.filter((comment) => comment.id !== action.comment.id);

    default:
      return state;
  }
};

export default postCommentsReducer;