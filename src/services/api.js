const API_KEY = "0457c5fd4c9661c9afff7cce3639ac9a"
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
};

export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
};

export const getRecentMovies = async (page = 1) => {
  // use discover sorted by release date descending to get most recent releases
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return data;
};