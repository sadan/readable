import { UPDATE_COMMENT_SUCCESS, CREATE_COMMENT_SUCCESS } from '../constants';
import {defaultHeaders} from '../../../utils'

const headers = defaultHeaders()
const BASE_URL = process.env.REACT_APP_BASE_URL

const createCommentSuccess = comment => ({
  type: CREATE_COMMENT_SUCCESS,
  comment
});

const updateCommentSuccess = comment => ({
  type: UPDATE_COMMENT_SUCCESS,
  comment
});

const createComment = (params, update) => {
  return dispatch => {
    let url = !update ? `${BASE_URL}/comments` : `${BASE_URL}/comments/${params.id}`;
    let method = !update ? 'POST' : 'PUT';
    let body = params;

    if(update) {
      body = {
        timestamp: params.timestamp,
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
          update ? dispatch(updateCommentSuccess(data)) : dispatch(createCommentSuccess(data));
        })
        .catch(err => console.log(err))
    );
  };
};

export { createComment };
