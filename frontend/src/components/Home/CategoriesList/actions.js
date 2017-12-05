import { CATEGORIES_RECEIVED } from './constants';

const defaultHeader = {Authorization: process.env.REACT_APP_AUTHORIZATION};
const BASE_URL = process.env.REACT_APP_BASE_URL

const categoriesReceived = categories => ({
  type: CATEGORIES_RECEIVED,
  categories
});

const fetchCategories = () => {
  return dispatch => {
    return (
      fetch(`${BASE_URL}/categories`, {headers: defaultHeader})
        .then(res => res.json())
        .then(data => dispatch(categoriesReceived(data.categories)))
        .catch(err => console.log(err))
    );
  };
};

export { fetchCategories };
