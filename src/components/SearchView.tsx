import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

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
    <div className="bg-gradient-to-b from-black to-red-900 container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-red-500">TV Show Search</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <input
            className="border border-gray-400 px-4 py-2 w-2/4 rounded"
            id="query"
            type="text"
            placeholder="Search for a tv show"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
            type="submit"
            disabled={loading}
          >
            Search
          </button>
        </div>
      </form>
      {loading ? <Loading /> : null}
      {error && <p className="text-l text-gray-200 p-2 font-bold">{error}</p>}
      <div className="container py-4 flex flex-wrap justify-center items-center">
        {results.map((show) =>
          show.image ? (
            <div className="h-full p-4 lg:w-1/3" key={show.id}>
              <Link to={`/detail/${show.id}`}>
                <p className="text-l text-gray-200 py-2 font-bold text-center w-40">
                  {show.name}
                </p>
              </Link>
              <Link to={`/detail/${show.id}`}>
                <img src={show.image.medium} alt={show.name} />
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default SearchView;
