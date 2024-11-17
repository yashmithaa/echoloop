import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { MusicContext } from "../Context";
import { initializePlaylist } from "../initialize";

const SearchPage = ({ token, setToken }) => {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);

  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();
      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();

    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=feda84ac319943ac8ea5735ea22c9afc&client_secret=e5acdac715304e4ea8c03e52ce8dcd5d",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      fetchToken();
    }
  }, [token, setToken, setIsLoading]);

  return (
    <div className="container">
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
        <input
          type="text"
          className="form-control"
          placeholder="Search for music..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="row">
        {tracks.map((element) => (
          <Card key={element.id} element={element} />
        ))}
      </div>
      <div className="row" hidden={tracks.length === 0}>
        <div className="col">
          <button
            onClick={() => {
              setResultOffset((previous) => previous - 20);
              fetchMusicData();
            }}
            className="btn btn-outline-info w-100"
            disabled={resultOffset === 0}
          >
            Previous Page: {resultOffset / 20}
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => {
              setResultOffset((previous) => previous + 20);
              fetchMusicData();
            }}
            className="btn btn-outline-info w-100"
          >
            Next Page: {resultOffset / 20 + 2}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4 className="text-center text-danger py-2">{message}</h4>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
