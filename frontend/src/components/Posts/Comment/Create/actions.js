import { CREATE_COMMENT_SUCCESS } from '../constants';

const defaultHeader = new Headers();
defaultHeader.append('Authorization', 'boohoo43');
defaultHeader.append('Content-Type', 'application/json');
defaultHeader.append('Accept', 'application/json');

const createCommentSuccess = comment => ({
  type: CREATE_COMMENT_SUCCESS,
  comment
});

const createComment = params => {
  return dispatch => {
    let url = 'http://localhost:3001/comments';
    let requestData = {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(params)
    };
    let request = new Request(url, requestData);

    return (
      fetch(request)
        .then(res => res.json())
        .then(data => dispatch(createCommentSuccess(data)))
        .catch(err => console.log(err))
    );
  };
};

export { createComment };
