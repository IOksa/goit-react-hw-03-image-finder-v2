import { Component } from 'react';
import * as API from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import {queryLimit} from '../constants/constants';


export class App extends Component{
  state = {
    query:'',
    gallery: [],
    countPage: 1,
    isLoading: false,
    isLoadButton: true,
  };


  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    console.log("componentDidUpdate prevState=", prevState);
    console.log("componentDidUpdate this.state=", this.state);

    //prevState.gallery.length>this.state.gallery.length - эта проверка на случай, если пользователь отправит снова тот же запрос, уже загрузив первую страницу для такого же предыдущего запроса. В этом случае запросы и страницы будут равны и componentDidUpdate не запустит this.fetchImages(). При этом при изменении input срабатывает onChangeQuery и gallery: [] , поэтому <ImageGallery> не отрисовывается.

    if (prevState.query !== this.state.query ||
       prevState.countPage !== this.state.countPage ||
       prevState.gallery.length > this.state.gallery.length
       ) {
      console.log("componentDidUpdate запускаю this.fetchImages()");
      this.fetchImages();
      
    }
  }

  onChangeQuery = searchQuery => {
    console.log('onChangeQuery');

    // console.log('searchQuery=', searchQuery);

    if(searchQuery.query===''){
      toast.error('Empty search input');
      return;
    }
    this.setState({
      query: searchQuery.query,
      countPage: 1,
      gallery: [],
      error: null,
    });

    
  };


  fetchImages = async () => {
    console.log('fetchImages');
    const { query, countPage } = this.state;

    try {
      this.setState({ isLoading: true });
      const images = await API.getFetchQueryImageGallery(query, countPage);
      this.checkQueryResponse(images);
    }
    catch(error) {
      this.setState({ error })
      const errorMessage="Ой! Что-то пошло не так :( Перезагрузите страницу и попробуйте еще раз."+error.toString();
      toast.error(errorMessage);
    }
    finally{
      this.setState({isLoading: false });
    }

    
  };

 

  checkQueryResponse=(images)=>{
    console.log('checkQueryResponse');
    if (images.length===0){
      toast.error('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
      this.setState(prevState => ({gallery: [...prevState.gallery, ...images.hits]}));

      // console.log("images=",images.hits);
      // console.log("this.state.gallery=", this.state.gallery);

    }
      
    if(this.state.countPage>images.totalHits/queryLimit){
      this.setState({isLoadButton : false});
      toast.info("We're sorry, but you've reached the end of search results.");
    }
 
  }
    
  handleOnClickLoadMore =()=>{
    this.setState(prevState => ({countPage: prevState.countPage + 1}));
  }

  render(){
    console.log('render');
    const { gallery, isLoading, isLoadButton} = this.state;
    //console.log("render gallery=", gallery);
    const shouldRenderImageGallery=gallery.length!==0 && !isLoading;
    const shouldRenderLoadButton=gallery.length!==0 && !isLoading && isLoadButton;

    return(
      <>
      <ToastContainer autoClose="3000" theme="colored"/>
      <Searchbar onSubmit={this.onChangeQuery}/>
      {isLoading && <Loader/>}
      {shouldRenderImageGallery && <ImageGallery gallery={gallery}/>}
      {shouldRenderLoadButton && <Button onClickLoadMore={this.handleOnClickLoadMore}/>}
      
      </>
    );
  }
}

