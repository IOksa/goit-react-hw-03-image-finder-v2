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
    isLoading: false,

    countPage: 1,
    isLoadButton: true,
  };


  //Получение данных по запросу fetch для первого рендера галлереи
  getFirstImageGallery = async (searchQuery) => {

    this.setState({ query: searchQuery.query });
    this.setState({gallery: []});
    this.setState({countPage: 1});
    this.setState({isLoadButton: true});
    const {countPage} = this.state;

    console.log("getImageGallery searchQuery.query=", searchQuery.query);
    console.log("getImageGallery countPage=", countPage);

    if(searchQuery.query!==''){
      try {
        this.setState({ isLoading: true });
        const images = await API.getFetchQueryImageGallery(searchQuery.query, 1);
        this.checkQueryResponse(images);
        
      } catch (error) {

        const errorMessage="Ой! Что-то пошло не так :( Перезагрузите страницу и попробуйте еще раз."+error.toString();
        toast.error(errorMessage);
      
      }finally{
        this.setState({isLoading: false });
    
      }
    }
    else{
      toast.error('Empty search input');
    }
  };

  checkQueryResponse=(images)=>{
    if (images.length===0){
      toast.error('Sorry, there are no images matching your search query. Please try again.');
    }
    else{
   
      this.setState({gallery: [...this.state.gallery, ...images.hits]});
 
      console.log("images=",images.hits);
      console.log("this.state.gallery=", this.state.gallery);

    }
      
    if(this.state.countPage>images.totalHits/queryLimit){
      this.setState({isLoadButton : false});
      toast.info("We're sorry, but you've reached the end of search results.");
    }
 
  }
    
  

   onClickLoadMore= async ()=>{
    console.log("onClickLoadMore");

    const nextPage=this.state.countPage+1;
    this.setState({countPage: nextPage});

    console.log("onClickLoadMore query=", this.state.query);

    console.log("onClickLoadMore nextPage=", nextPage);
    const {query} = this.state;

    try {
      this.setState({ isLoading: true });

      const images = await API.getFetchQueryImageGallery(query, nextPage);

      this.checkQueryResponse(images);
      
    } catch (error) {
 
      const errorMessage="Ой! Что-то пошло не так :( Перезагрузите страницу и попробуйте еще раз."+error.toString();
      toast.error(errorMessage);
    
    }finally{
      this.setState({isLoading: false });
     
    }
  }

  render(){
    const { gallery, isLoading, isLoadButton} = this.state;
    console.log("render gallery=", gallery);
    return(
      <>
      <ToastContainer autoClose="3000" theme="colored"/>
      <Searchbar onSubmit={this.getFirstImageGallery}/>
      {isLoading && <Loader/>}
      {gallery.length!==0 && !isLoading && <ImageGallery gallery={gallery}/>}
      {gallery.length!==0 && !isLoading && isLoadButton && <Button onClickLoadMore={this.onClickLoadMore}/>}
      
      </>
    );
  }
}

