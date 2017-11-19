import { POSTS_RECEIVED } from './constants';

const defaultHeader = {Authorization: 'boohoo43'};

const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts
});

const fetchPosts = () => {
  return dispatch => {
    return (
      fetch('http://localhost:3001/posts', {headers: defaultHeader})
      .then(res => res.json())
      .then(data => dispatch(postsReceived(data)))
      .catch(err => console.log(err))
    );
  };
};

export { fetchPosts }
