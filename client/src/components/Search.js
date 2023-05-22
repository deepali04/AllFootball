import React from 'react';
import '../App.css';

function Search(props) {
    const handleChange = (e) => {
        props.searchValue(e.target.value);
      };
      return (
        <form
          method='POST'
          onSubmit={(e) => {
            e.preventDefault();
          }}
          name='formName'
          className='center '
        >
          <label>
            <span className='searchbar'> Search Players: &nbsp;
            <input
              autoComplete='off'
              type='text'
              name='searchTerm'
              onChange={handleChange}
            />
            </span>
          </label>
        </form>
      );
    
}
export default Search;