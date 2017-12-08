import { initialState } from '../../initialState/initialState';
import { POSTS_RECEIVED, SET_SELECTED_POST, POSTS_LIST_VOTE_SUCCESS } from '../../utils/constants';

const postsReducer = (state = initialState.posts, action) => {
  switch(action.type) {
    case POSTS_RECEIVED:
      return Object.assign({}, state, {list: action.posts});

    case SET_SELECTED_POST:
      return Object.assign({}, state, {selectedPostId: action.postId});

    case POSTS_LIST_VOTE_SUCCESS:
      return {
        ...state,
        list: state.list.map(post => {
          return post.id === action.post.id
            ? {...post, voteScore: action.post.voteScore}
            : post
        })
      }
    
    default:
      return state;
  }
};

export default postsReducer;