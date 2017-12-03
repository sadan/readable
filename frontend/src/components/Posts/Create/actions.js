import { setSelectedPost } from '../../Home/actions';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

const createPost = (params, update) => {
  return dispatch => {
    let url = !update ? 'http://localhost:3001/posts' : `http://localhost:3001/posts/${params.id}`;
    let method = !update ? 'POST' : 'PUT';
    let body = params;

    if(update) {
      body = {
        title: params.title,
        body: params.body
      };
    }

    let requestData = {
      method: method,
      headers: defaultHeader,
      body: JSON.stringify(body)
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
