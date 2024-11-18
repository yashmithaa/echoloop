import React, { useState, useContext, useEffect } from "react";
import { MusicContext } from '../Context';
import Card from '../components/Card';
import Footer from '../components/Footer';

function SearchPage() {
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useContext(MusicContext);
    const [resultOffset, setResultOffset] = useState(0);
    const RESULTS_PER_PAGE = 20;

    const fetchSearchResults = async () => {
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(keyword)}&type=track&offset=${resultOffset}&limit=${RESULTS_PER_PAGE}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }

            const data = await response.json();
            setSearchResults(data.tracks.items);
            console.log('Search results:', data.tracks.items);
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setResultOffset(0);
            fetchSearchResults();
        }
    };

    const loadMore = () => {
        setResultOffset(prev => prev + RESULTS_PER_PAGE);
    };

    useEffect(() => {
        if (resultOffset > 0) {
            fetchSearchResults();
        }
    }, [resultOffset]);

    return (
        <div className="container py-5">
            <div className="row mb-4 justify-content-center">
                <div className="col-md-8">
                    <div className="input-group">
                        <input
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                            onKeyDown={handleKeyPress}
                            className="form-control"
                            type="search"
                            placeholder="Search for songs..."
                            aria-label="Search"
                        />
                        <button
                            onClick={() => {
                                setResultOffset(0);
                                fetchSearchResults();
                            }}
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            ) : (
                                <i className="bi bi-search me-1"></i>
                            )}
                            Search
                        </button>
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Search Results */}
            <div className="row">
                {searchResults.length > 0 && (
                    <div className="col-12 mb-4">
                        <h2 className="text-white">Search Results</h2>
                    </div>
                )}
                {searchResults.map((track) => (
                    <Card key={track.id} element={track} />
                ))}
            </div>

            {/* No Results Message */}
            {!isLoading && keyword && searchResults.length === 0 && (
                <div className="text-center text-white mt-5">
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms</p>
                </div>
            )}

            {/* Load More Button */}
            {searchResults.length > 0 && searchResults.length >= RESULTS_PER_PAGE && (
                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <button
                            className="btn btn-outline-light"
                            onClick={loadMore}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            ) : (
                                'Load More'
                            )}
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default SearchPage;