import { useState, useEffect } from 'react';
import React from 'react';
import youtubeApi from '../youtubeApi';
import { auth, firestore } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import '../styles/Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');

  // Handle search term input and fetch videos from YouTube API
  const handleSearch = async (e, isFormSubmit = false) => {
    if (isFormSubmit) {
      e.preventDefault();
    }
    const response = await youtubeApi.get('/search', {
      params: {
        q: searchTerm || 'jiu jitsu',
        type: 'video',
        pageToken,
      },
    });
    setVideos(response.data.items);
    setNextPageToken(response.data.nextPageToken);
  };

  // Load next page of videos from YouTube API
  const handleNextPage = () => {
    setPageToken(nextPageToken);
    handleSearch(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a video to the user's playlist in Firebase
  const addToPlaylist = async (video) => {
    if (!auth.currentUser || !auth.currentUser.uid) {
      alert('Please sign in to add videos to your playlist.');
      return;
    }

    try {
      const playlistRef = collection(firestore, 'playlists');
      await addDoc(playlistRef, {
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

  // Fetch videos from YouTube API on page load
  useEffect(() => {
    handleSearch();
  }, []);

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
