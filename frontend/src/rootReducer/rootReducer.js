import { combineReducers } from 'redux';

import categories from '../components/CategoriesList/reducers';
import posts from '../components/Home/reducers';
import postDetail from '../components/Posts/Detail/reducers';
import postComments from '../components/Posts/Comment/reducers';

export default combineReducers({
  categories,
  posts,
  postDetail,
  postComments
});
