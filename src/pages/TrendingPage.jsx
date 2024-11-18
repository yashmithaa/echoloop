import React from 'react'
import { useState, useContext,useEffect } from 'react';
import { MusicContext } from '../Context';
import Card from '../components/Card';

function TrendingPage(){
    const [trendingTracks, setTrendingTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const musicContext = useContext(MusicContext);
    const token = musicContext.token; 
  
    useEffect(() => {
        if (!token) return; // Wait until the token is available
      
        const fetchTrendingSongs = async () => {
          setTrendingTracks([]);
          window.scrollTo(0, 0);
          setIsLoading(true);
          try {
            const response = await fetch(
              `https://api.spotify.com/v1/search?q=tag:new&type=track&offset=0`,
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
            setTrendingTracks(jsonData.tracks.items);
            console.log(jsonData.tracks.items);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchTrendingSongs();
      }, [token]);
      
  
    return (
      <div className="container py-5">
        <h1>Trending Songs</h1>
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className="row">
          {trendingTracks.map((track) => (
            <Card key={track.id} element={track} />
          ))}
        </div>
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {trendingTracks.map((track) => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        )} */}
      </div>
    );
}
export default TrendingPage