import { initialState } from '../../initialState/initialState';
import { CATEGORIES_RECEIVED } from '../../utils/constants';

const categoriesReducer = (state = initialState.categories, action) => {
  switch(action.type) {
    case CATEGORIES_RECEIVED:
      return {
        ...state,
        list: action.categories
      };
    
    default:
      return state;
  }
};

export default categoriesReducer;
