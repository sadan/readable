import { combineReducers } from 'redux';

import categories from '../components/Home/CategoriesList/reducers';
import posts from '../components/Home/reducers';

export default combineReducers({
  categories,
  posts
});
