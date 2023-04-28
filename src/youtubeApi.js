import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyCJwrX8TpHqXI2TnJAB0DbxDSmJl7p5RFw',
  },
});

export default youtubeApi;
