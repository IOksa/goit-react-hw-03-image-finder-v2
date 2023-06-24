import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal=({children, onCloseModal})=>{
    return createPortal(
        <div className={css.Overlay} 
        
            //закрытие модалки по клику на бекдроп
             onClick={(event) =>{
                if (event.currentTarget === event.target) {
                    console.log("Modal onClick (backdrop)")
                    onCloseModal();

                }}}>

            <div className={css.Modal}>{children}
              
            </div>
        </div>,
        document.querySelector("#popup-root")
    );
};




export default Modal;


Modal.propTypes={
 
    onCloseModal: PropTypes.func.isRequired,

}; 

