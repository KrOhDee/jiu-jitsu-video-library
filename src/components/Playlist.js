import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import '../styles/Playlist.css';

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const playlistRef = collection(firestore, 'playlists');
    const userId = auth.currentUser?.uid;

    // Only fetch the playlist if the user is signed in
    if (userId) {
      const q = query(playlistRef, where('userId', '==', userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newPlaylist = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the fetched playlist and set isLoading to false
        setPlaylist(newPlaylist);
        setIsLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const removeFromPlaylist = async (videoId) => {
    try {
      await deleteDoc(doc(collection(firestore, 'playlists'), videoId));
      alert('Video removed from your playlist.');
    } catch (error) {
      alert(error.message);
    }
  };

  // Show a loading message while the playlist is being fetched
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="playlist-container">
      <h1 className="your-playlist-title">Your Playlist</h1>
      <div className="videos-container">
        {playlist.map((video) => (
          <div key={video.videoId} className="video-card">
            <iframe
              className="video-iframe"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="video-title">{video.title}</h3>
            <button
              className="remove-button"
              onClick={() => removeFromPlaylist(video.id)}
            >
              Remove from Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
