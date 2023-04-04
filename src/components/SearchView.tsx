import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchView() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      setResults(response.data.map((item: any) => item.show));
    } catch (error) {
      setError(
        "An error occurred while searching for shows. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">TV Show Search</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <input
            className="border border-gray-400 px-4 py-2 w-full mb-2"
            id="query"
            type="text"
            placeholder="Search for a tv show"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={loading}
          >
            Search
          </button>
        </div>
      </form>
      {loading && <p>Loading results...</p>}
      {error && <p>{error}</p>}
      <div className=" flex flex-wrap mb-4">
        {results.map((show) => (
          <div className="border-4 border-transparent" key={show.id}>
            <Link to={`/detail/${show.id}`}>
              <h2 className="text-3xl">{show.name}</h2>
            </Link>
            {show.image && (
              <Link to={`/detail/${show.id}`}>
                <img src={show.image.medium} alt={show.name} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchView;
