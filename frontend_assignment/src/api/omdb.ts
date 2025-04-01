const API_KEY = "9270d7fc"; // Free API key for demo purposes
const API_URL = "https://www.omdbapi.com";

export async function searchMovies(query: string) {
  const response = await fetch(
    `${API_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  if (data.Error) {
    throw new Error(data.Error);
  }

  return data.Search || [];
}
