import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from './actions';

class CategoriesList extends Component {
  componentDidMount() {
    const { fetchCategories } = this.props;

    fetchCategories();
  }

  render() {
    let categories = this.props.categories;
    
    return (
      <div style={{
        padding: '15px 15px 10px',
        backgroundColor: '#fff8dc',
        border: '1px solid #e0dcbf',
        fontSize: '13px', lineHeight: 1.3
      }}>
        <div style={{ 
          fontWeight: 'bold',
          fontSize: '11px',
          color: '#9c988b',
          textTransform: 'uppercase',
          marginBottom: '10px',
          lineHeight: 1.8,
          borderBottom: '1px solid #e0dcbf'
        }}>Categories</div>
        <ul style={{
          paddingLeft: '15px', textTransform: 'capitalize'}}>
          {categories.length
            ? categories.map((category, i) => <li key={i}>{category.name}</li>)
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
  fetchCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);