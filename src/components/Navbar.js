import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setResultOffset = musicContext.setResultOffset;

  
  
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-info sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-soundwave mx-1"></i> Echoloop
          </Link>
          

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
            <li className="nav-item">
              <Link className="nav-link mx-4" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#likedMusicModal"
                >
                  Favourites
                </button>
              </li>
              <li className="nav-item">
              <Link className="nav-link mx-4" to="/trending">
                  Trending
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/library">
                  Library
                </Link>
              </li>
              <li className="nav-item mx-4">
              <Link className="nav-link" to="/search">
                  Search
              </Link>
              </li>
              <li className="nav-item">
              <button
                className="nav-link btn mx-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i class="bi bi-person-circle mx-2"></i>Profile
              </button>
              </li>
              
            </ul>
            {/* <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="form-control me-1 w-25"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="btn btn-outline-info"
            >
              Search
            </button> */}
            
          </div>
        </div>
      </nav>

      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl "
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
