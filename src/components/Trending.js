import React, { useEffect, useState, useContext } from "react";
import { MusicContext } from "../Context";

const Trending = () => {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const musicContext = useContext(MusicContext);
  const token = musicContext.token; // Use your context or state for the token

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/browse/featured-playlists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trending songs");
        }

        const jsonData = await response.json();
        setTrendingTracks(jsonData.playlists.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingSongs();
  }, [token]);

  return (
    <div>
      <h1>Trending Songs</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {trendingTracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trending;
