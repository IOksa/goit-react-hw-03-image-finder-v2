import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal=({largeImageURL,tags, onCloseModal, onBackDropClick})=>{
    return ReactDOM.createPortal(
        <div className={css.Overlay} onClick={
            (event) =>{
                console.log('onBackdropClick=', event);
                if (event.currentTarget === event.target) {
                    this.onCloseModal();
                }}}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} onClick={onCloseModal} width="800" />
            </div>
        </div>,
        document.querySelector("#popup-root")
    );
};




export default Modal;


Modal.propTypes={
    largeImageURL: PropTypes.string.isRequired,
    tags:  PropTypes.string.isRequired,
  
    onCloseModal: PropTypes.func.isRequired,
   // onBackDropClick: PropTypes.func.isRequired,
}; 

