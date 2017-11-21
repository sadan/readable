import { combineReducers } from 'redux';

import categories from '../components/Home/CategoriesList/reducers';
import posts from '../components/Home/reducers';
import postDetail from '../components/Posts/PostDetail/reducers';

export default combineReducers({
  categories,
  posts,
  postDetail
});
