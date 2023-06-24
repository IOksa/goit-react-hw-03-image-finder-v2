import { Component } from 'react';
import Modal from '../Modal/Modal';
import BigImageInModal from '../BigImageInModal/BigImageInModal';
import css from './ImageGalleryItem.module.css';


class ImageGalleryItem extends Component{ 
  state = {
    isModalOpen: false,
       
  };

  
  onOpenModal = () => {
		this.setState({ isModalOpen: true });
    window.addEventListener('keydown', this.onEscKeyPress);
    
    //console.log("onOpenModal", this.state.isModalOpen);
	};

  onCloseModal = () => {
		this.setState({ isModalOpen: false });
    window.removeEventListener('keydown', this.onEscKeyPress);
 
	};

  onEscKeyPress=(event)=> {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
        this.onCloseModal();
    }
  };


  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: "smooth" });
  
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }








  render(){
    const {isModalOpen}=this.state;
    const {image:{webformatURL,tags,largeImageURL}}=this.props;

    return (
      <>
     
        <li className={css.ImageGalleryItem} onClick={this.onOpenModal} ref={(el) => { this.messagesEnd = el; } }>

          <img src={webformatURL} alt={tags} loading="lazy" className={css.ImageGalleryItemImage} />

        </li>
       
        {isModalOpen && (
        <Modal onCloseModal={this.onCloseModal} >
          <BigImageInModal largeImageURL={largeImageURL} tags={tags} />
        </Modal>
        )}
      </>
      
      );
  
  }

   

};

 
export default ImageGalleryItem;






