import { setSelectedPost } from '../../Home/actions';
import {defaultHeaders} from '../../utils'

const headers = defaultHeaders()
const BASE_URL = process.env.REACT_APP_BASE_URL

const createPost = (params, update) => {
  return dispatch => {
    let url = !update ? `${BASE_URL}/posts` : `${BASE_URL}/posts/${params.id}`;
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
      headers: headers,
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
