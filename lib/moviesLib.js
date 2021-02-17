import axios from 'axios';


export const getUpcomingMovies = async () => {
    const {data} = await axios.get('/movie/playing')
    return data
}

export const searchMovies = async (query) => {
    const {data} = await axios.get(`/search/movie/${query}`)
    return data
}

export const searchTVshows = async (query) => {
    const {data} = await axios.get(`/search/tv/${query}`)
    return data
}

export const searchCast = async (query) => {
    const {data} = await axios.get(`/search/cast/${query}`)
    return data
}




export const getMovieDetails = async (id) => {
    const {data} = await axios.get(`/movie/${id}`)
    return data
}

export const getTVshowDetails = async (id) => {
    const {data} = await axios.get(`/tv/${id}`)
    return data
}


