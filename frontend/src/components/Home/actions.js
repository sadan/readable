import { POSTS_RECEIVED } from './constants';

const defaultHeader = {Authorization: 'boohoo43'};

const postsReceived = posts => ({
  type: POSTS_RECEIVED,
  posts
});

const fetchPosts = () => {
  return dispatch => {
    let url = 'http://localhost:3001/posts';
    
    return (
      fetch(url, {headers: defaultHeader})
      .then(res => res.json())
      .then(data => dispatch(postsReceived(data)))
      .catch(err => console.log(err))
    );
  };
};

export { fetchPosts };
