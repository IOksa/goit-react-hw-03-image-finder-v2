import React, { Component } from 'react';
import css from './Searchbar.module.css';
import sprite from '../../icons/sprite.svg';

class Searchbar extends Component{
    state={
        query:'',
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value.trim() });

    };

    handleSubmit = e => {
        e.preventDefault();
       
        this.props.onSubmit(this.state);
    
        this.setState({ query: ''});
    };


    render(){
        return(
            <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchFormButton} >
                <svg width="20" height="20">
                <use href={sprite}></use>
                </svg>
            </button>
        
            <input
                className={css.SearchFormInput}
                type="text"
                name="query"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
            />
            </form>
            </header>
        );
    };
}

export default Searchbar;

