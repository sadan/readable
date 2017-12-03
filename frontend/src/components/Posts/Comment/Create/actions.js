import { UPDATE_COMMENT_SUCCESS, CREATE_COMMENT_SUCCESS } from '../constants';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

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
    let url = !update ? 'http://localhost:3001/comments' : `http://localhost:3001/comments/${params.id}`;
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
      headers: defaultHeader,
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
