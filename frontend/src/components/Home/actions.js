import { POSTS_RECEIVED, SET_SELECTED_POST } from '../../utils/constants';
import { fetchPosts } from '../../utils/api';

const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts
});

const setSelectedPost = postId => ({
  type: SET_SELECTED_POST,
  postId
})

const getPosts = () => {
  return dispatch => {
    fetchPosts()
      .then(data => Promise.all(data))
      .then(posts => dispatch(postsReceived(posts)))
  };
};

export { getPosts, setSelectedPost };
