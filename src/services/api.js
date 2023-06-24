import axios from 'axios';
import {BASE_URL, API_KEY, queryLimit} from '../constants/constants';

export const getFetchQueryImageGallery = async (searchQuery, countPage)=>{
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: queryLimit,
        page: countPage,

    });

        const response = await axios.get(`${BASE_URL}?${params}`);
        console.log("fetch searchQuery=", searchQuery);
        return response.data;

       
}

