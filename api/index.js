import axios from "axios";

const API_KEY = '46002713-46208979b8111743bdf957526';

const apiURL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) =>{
    let url = apiURL + "&per_page=30&safeSearch=true&editors_choice=true"
    if(!params) return url;
    let paramsKey = Object.keys(params);
    paramsKey.map(key=>{
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    });
    //console.log('final url: ', url);
    return url;
}

export const apiCall = async (params)=>{
    try{
        const response = await axios.get(formatUrl(params));
        const {data} = response;
        return {success: true, data};
    }catch(err){
        console.log('got error: ', err.message);
        return {success: false, msg: err.message};
    }
}