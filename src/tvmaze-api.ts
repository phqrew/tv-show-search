import axios from 'axios';

const baseUrl = 'https://api.tvmaze.com';

export const searchSeries = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search/shows?q=${query}`);
  return response.data;
};

export const getSeries = async (id: number) => {
  const response = await axios.get(`${baseUrl}/shows/${id}`);
  return response.data;
};