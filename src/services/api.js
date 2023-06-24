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
        console.log("getFetchQueryImageGallery");
        //console.log("fetch searchQuery=", searchQuery);
        const fetchQuery=`${BASE_URL}?${params}`;
        //console.log("fetch fetchQuery=", fetchQuery);

        const response = await axios.get(fetchQuery);
       
        //console.log("fetch response.data=", response.data);

        return response.data;

       
}

