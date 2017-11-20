import { initialState } from '../../initialState/initialState';
import { POSTS_RECEIVED } from './constants';

const postsReducer = (state = initialState.posts, action) => {
  switch(action.type) {
    case POSTS_RECEIVED:
      return Object.assign([], state, action.posts);
    
    default:
      return state;
  }
};

export default postsReducer;