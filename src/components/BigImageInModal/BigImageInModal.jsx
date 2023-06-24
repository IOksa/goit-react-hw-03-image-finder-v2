import PropTypes from 'prop-types';

const BigImageInModal = ({largeImageURL, tags}) =>(
    <img src={largeImageURL} alt={tags} width="800" />
);

export default BigImageInModal;

BigImageInModal.propTypes={
    largeImageURL: PropTypes.string.isRequired,
    tags:  PropTypes.string.isRequired,
  


}; 