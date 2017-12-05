import { POSTS_RECEIVED, SET_SELECTED_POST } from './constants';

const defaultHeader = {Authorization: process.env.REACT_APP_AUTHORIZATION};
const BASE_URL = process.env.REACT_APP_BASE_URL

const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts
});

const setSelectedPost = postId => ({
  type: SET_SELECTED_POST,
  postId
});

const fetchPosts = () => {
  return dispatch => {
    let url = `${BASE_URL}/posts`;
    
    return (
      fetch(url, {headers: defaultHeader})
        .then(res => res.json())
        .then(data => dispatch(postsReceived(data)))
        .catch(err => console.log(err))
    );
  };
};

export { fetchPosts, setSelectedPost };
