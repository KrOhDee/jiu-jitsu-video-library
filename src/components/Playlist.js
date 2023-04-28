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

function Playlist() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const playlistRef = collection(firestore, 'playlists');
    const q = query(playlistRef, where('userId', '==', auth.currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      await deleteDoc(doc(collection(firestore, 'playlists'), videoId));
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
