import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie, MovieSearchResponse } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(
  query: string,
  page: number = 1
): Promise<Movie[]> {
  if (!query.trim()) {
    return [];
  }

  const options = {
    method: "GET",
    url: API_URL,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      accept: "application/json",
      Authorization: API_TOKEN,
    },
  };

  const response: AxiosResponse<MovieSearchResponse> = await axios.request(
    options
  );

  return response.data.results;
}
