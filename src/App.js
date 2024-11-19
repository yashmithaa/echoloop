import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { initializePlaylist } from "./initialize";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";
import Landing from "./pages/Landing";
import TrendingPage from "./pages/TrendingPage";
import Library from "./pages/Library";
import GenrePage from "./components/GenrePage";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import Fav from "./pages/Fav";

function App() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedMusic, setLikedMusic] = useState([]);
  const [pinnedMusic, setPinnedMusic] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);
  
  // const musicContext = useContext(MusicContext);
  // const isLoading = musicContext.isLoading;
  // const setIsLoading = musicContext.setIsLoading;
  // const setLikedMusic = musicContext.setLikedMusic;
  // const setpinnedMusic = musicContext.setPinnedMusic;
  // const resultOffset = musicContext.resultOffset;
  // const setResultOffset = musicContext.setResultOffset;

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
      console.log(jsonData.tracks.items);
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
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    // setpinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));
  }, [setIsLoading, setLikedMusic]);

  return (
    <MusicContext.Provider
      value={{
        token,
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        pinnedMusic,
        setPinnedMusic,
        resultOffset,
        setResultOffset,
      }}
    >
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fav" element={<Fav />} />
      </Routes>
    </MusicContext.Provider>
  );
}

export default App;
