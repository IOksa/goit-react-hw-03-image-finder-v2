import { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component{ 
  state = {
    isModalOpen: false,
       
  };

  
  onOpenModal = () => {
		this.setState({ isModalOpen: true });
    window.addEventListener('keydown', this.onEscKeyPress);
    
    console.log("onOpenModal", this.state.isModalOpen);
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

  // onBackdropClick=(event) =>{
  //   console.log('onBackdropClick=', event);
  //   if (event.currentTarget === event.target) {
  //       this.onCloseModal();
  //   }
  // }

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
        <li className={css.ImageGalleryItem} ref={(el) => { this.messagesEnd = el; }}>
          <img src={webformatURL} alt={tags} loading="lazy" className={css.ImageGalleryItemImage} onClick={this.onOpenModal}/>
        </li>
        {isModalOpen && 
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onCloseModal={this.onCloseModal}
          onBackDropClick={this.onBackdropClick}
        />}
      
      </>
      
      );
  
  }

   

};

 
export default ImageGalleryItem;





