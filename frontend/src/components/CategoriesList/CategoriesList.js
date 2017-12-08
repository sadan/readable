import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { _fetchCategories } from './actions';

class CategoriesList extends Component {
  componentDidMount() {
    const { _fetchCategories } = this.props;

    _fetchCategories();
  }

  render() {
    let categories = this.props.categories;
    
    return (
      <div className='categories-box'>
        <div className='categories-box-title'>Categories</div>
        <ul className='categories-list'>
          {categories.length
            ? categories.map((category, i) => (
              <Link key={i} to={`/${category.path}`}>
                <li>{category.name}</li>
              </Link>
            ))
            : null}
        </ul>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  categories: state.categories.list
});

let mapDispatchToProps = {
  _fetchCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);