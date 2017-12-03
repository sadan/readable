import { setSelectedPost } from '../../Home/actions';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

const createPost = params => {
  return dispatch => {
    let url = 'http://localhost:3001/posts';
    let requestData = {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(params)
    };
    let request = new Request(url, requestData);

    return (
      fetch(request)
      .then(res => res.json())
      .then(data => {
        dispatch(setSelectedPost(data.id));
        return true;
      })
      .catch(err => console.log(err))
    );
  };
};

export { createPost };
