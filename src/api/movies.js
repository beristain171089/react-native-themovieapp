import { API_HOST, API_KEY, LANG } from '../utils/constants';

export function getNewsMovieApi(page = 1) {

    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`

    return fetch(url)
        .then((response) => {
            return response.json()
        }).then((result) => {
            return result;
        });

};

export function getGenreMovieApi(idGenres) {

    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`

    return fetch(url)
        .then((response) => {
            return response.json()
        }).then((result) => {

            const arrarayGenres = [];

            idGenres.forEach((id) => {

                result.genres.forEach((item) => {

                    if (item.id === id) arrarayGenres.push(item.name)

                });

            });

            return arrarayGenres;

        });

};