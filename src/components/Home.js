import { useState } from 'react';
import youtubeApi from '../youtubeApi';
import { auth, firestore } from '../firebase';

import '../styles/Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');

  const handleSearch = async (e, isFormSubmit = false) => {
    if (isFormSubmit) {
      e.preventDefault();
    }
    const response = await youtubeApi.get('/search', {
      params: {
        q: searchTerm + ' jiu-jitsu',
        type: 'video',
        pageToken,
      },
    });
    setVideos(response.data.items);
    setNextPageToken(response.data.nextPageToken);
  };

  const handleNextPage = () => {
    setPageToken(nextPageToken);
    handleSearch(null);
  };

  const addToPlaylist = async (video) => {
    if (!auth.currentUser) {
      alert('Please sign in to add videos to your playlist.');
      return;
    }

    try {
      await firestore.collection('playlists').add({
        userId: auth.currentUser.uid,
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
      });
      alert('Video added to your playlist.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={(e) => handleSearch(e, true)}>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for jiu-jitsu videos"
          />
          <button
            className="search-button"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
      <div className="videos-container">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <iframe
              className="video-iframe"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="video-title">{video.snippet.title}</h3>
            <button
              className="add-to-playlist-button"
              onClick={() => addToPlaylist(video)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div>
      {nextPageToken && (
        <button className="next-page-button" onClick={handleNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;