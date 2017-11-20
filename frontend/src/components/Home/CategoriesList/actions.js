import { CATEGORIES_RECEIVED } from './constants';

const defaultHeader = {Authorization: 'boohoo43'};

const categoriesReceived = categories => ({
  type: CATEGORIES_RECEIVED,
  categories
});

const fetchCategories = () => {
  return dispatch => {
    return (
      fetch('http://localhost:3001/categories', {headers: defaultHeader})
      .then(res => res.json())
      .then(data => dispatch(categoriesReceived(data.categories)))
      .catch(err => console.log(err))
    );
  };
};

export { fetchCategories };
