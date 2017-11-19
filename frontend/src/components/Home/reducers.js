import { initialState } from '../../initialState/initialState';
import { CATEGORIES_RECEIVED } from './constants';

const categoriesReducer = (state = initialState.categories, action) => {
  switch(action.type) {
    case CATEGORIES_RECEIVED:
      return Object.assign({}, state, {list: action.categories});
    
    default:
      return state;
  }
};

export default categoriesReducer;
