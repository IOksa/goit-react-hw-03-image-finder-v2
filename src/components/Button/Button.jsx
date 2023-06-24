import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = ({onClickLoadMore})=>(
    <div className={css.ButtonThumb}>
        <button hidden type="button" className={css.Button} onClick={onClickLoadMore}>Load more</button>
    </div>
    
    
);



export default Button;

Button.propTypes={
    onClickLoadMore: PropTypes.func.isRequired,
}; 