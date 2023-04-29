import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyDqnF7GwLdEJgvk-VOP2_78t1x-BtQDoSc',
  },
});

export default youtubeApi;
