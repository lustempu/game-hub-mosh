import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'ecd2f9d26b99432c9e22edefd7c10ebd'
    }
})