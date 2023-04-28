import { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';

function Playlist() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection('playlists')
      .where('userId', '==', auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        const newPlaylist = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlaylist(newPlaylist);
      });

    return () => unsubscribe();
  }, []);

  const removeFromPlaylist = async (videoId) => {
    try {
      await firestore.collection('playlists').doc(videoId).delete();
      alert('Video removed from your playlist.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Your Playlist</h1>
      <div>
        {playlist.map((video) => (
          <div key={video.videoId}>
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
            <button onClick={() => removeFromPlaylist(video.id)}>
              Remove from Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
