const express = require('express');
const axios = require('axios');
const { json, response } = require('express');

let router = express.Router();

const API_KEY = 'fcb194a23dd01dfa41c515e04b4f8a44'
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search'
const IMAGE_URL = 'http://image.tmdb.org/t/p/w300'

getPlayingMovies = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err
    }
}

getMovieDetails = async (id) => {

    try {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

getTVshowDetails = async (id) => {

    try {
        const { data } = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

searchMovies = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

searchCast = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/person?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

searchTV = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/tv?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

//router
router.get('/playing', (req, res) => {
    getPlayingMovies().then(response => {
        if (response.results) {
            const moviesData = response.results.map(each => {
                return {
                    ...each,
                    image_url: `${IMAGE_URL}${each.poster_path}`
                }
            })

            res.json(moviesData)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })
})

router.get('/movieID/:id', (req, res) => {

    getMovieDetails(req.params.id).then(response => {

        if (response.title) {
            res.json({ ...response, image_url: `${IMAGE_URL}${response.poster_path}` })
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })

})

router.get('/search/:query', (req, res) => {
    searchMovies(req.params.query).then(response => {
        if (response.results) {
            const moviesData = response.results.map(each => {
                return {
                    ...each,
                    image_url: `${IMAGE_URL}${each.poster_path}`
                }
            })

            res.json(moviesData)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }
    });
})


router.get('/cast/:query', (req, res) => {
    searchCast(req.params.query).then(response => {
        if (response.results) {
            if (response.results[0]) {
                const moviesData = response.results[0].known_for.map(each => {
                    return {
                        ...each,
                        image_url: `${IMAGE_URL}${each.poster_path}`
                    }
                })

                res.json(moviesData)
            }
            else return res.json(response.results)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }
    });
})


router.get('/tv/:query', (req, res) => {
    searchTV(req.params.query).then(response => {
        if (response.results) {
            const tvShows = response.results.map(each => {
                return {
                    ...each,
                    image_url: `${IMAGE_URL}${each.poster_path}`
                }
            })

            res.json(tvShows)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }
    });
})



router.get('/tvID/:id', (req, res) => {

    getTVshowDetails(req.params.id).then(response => {

        if (response.name) {
            res.json({ ...response, image_url: `${IMAGE_URL}${response.poster_path}` })
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })

})


module.exports = router;