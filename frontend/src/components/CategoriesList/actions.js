import { CATEGORIES_RECEIVED } from '../../utils/constants';
import { fetchCategories } from '../../utils/api'

const _fetchCategoriesSuccess = categories => ({
  type: CATEGORIES_RECEIVED,
  categories
});

const _fetchCategories = () => {
  return dispatch => fetchCategories()
    .then(categories => dispatch(_fetchCategoriesSuccess(categories)))
};

export { _fetchCategories };
