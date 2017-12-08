import { POSTS_RECEIVED, SET_SELECTED_POST, POSTS_LIST_VOTE_SUCCESS } from '../../utils/constants';
import { fetchPosts, postVote } from '../../utils/api';

const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts
});

const setSelectedPost = postId => ({
  type: SET_SELECTED_POST,
  postId
})

const _postsListVoteSuccess = post => ({
  type: POSTS_LIST_VOTE_SUCCESS,
  post
})

const _postsListVote = (postId, vote) => {
  return dispatch => {
    postVote(postId, vote)
      .then(post => dispatch(_postsListVoteSuccess(post)))
  }
}

const getPosts = () => {
  return dispatch => {
    fetchPosts()
      .then(data => Promise.all(data))
      .then(posts => dispatch(postsReceived(posts)))
  };
};

export { getPosts, setSelectedPost, _postsListVote };
