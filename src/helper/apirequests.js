const API_KEY = '0d8ab7cff2692bd014bb25fca16d7158';

export const requests = {
    getNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=en-US`,
    getCollection: (streamType, endpoint) => `${streamType}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    getDetails: (streamType, id) => `${streamType}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    getGenres: (streamType) => `genre/${streamType}/list?api_key=${API_KEY}`,
    getVideoByGenre: (streamType, genreId) => `/discover/${streamType}?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`,
}


export const platform = {
    tv: "tv",
    movie: "movie"
}

export const endpoints = {
    popular: "popular",
    topRated: "top_rated",
    nowPlaying: "now_playing",
    upcoming: "upcoming",
    airingToday: "airing_today",
    onTheAir: "on_the_air"
}

