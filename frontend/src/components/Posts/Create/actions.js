import { _setSelectedPost } from '../../Home/actions';
import { createEditPost } from '../../../utils/api';

const _createUpdatePost = (params, update) => {
  return dispatch => createEditPost(params, update)
    .then(data => {
      dispatch(_setSelectedPost(data.id))
      return true
    })
};

export { _createUpdatePost };
