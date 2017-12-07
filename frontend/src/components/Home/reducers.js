import { initialState } from '../../initialState/initialState';
import { POSTS_RECEIVED, SET_SELECTED_POST } from '../../utils/constants';

const postsReducer = (state = initialState.posts, action) => {
  switch(action.type) {
    case POSTS_RECEIVED:
      return Object.assign({}, state, {list: action.posts});

    case SET_SELECTED_POST:
      return Object.assign({}, state, {selectedPostId: action.postId});
    
    default:
      return state;
  }
};

export default postsReducer;