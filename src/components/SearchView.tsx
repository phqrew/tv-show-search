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
    <div className="">
      <h1 className="text-3xl">TV Show Search</h1>
      <br />
      <label>
        Type in the name of the TV show you want to search for in the search bar
        and press the "Search" button. Click on the Title to view the details of
        the TV show.
      </label>
      <br />
      <form onSubmit={handleSearch}>
        <input
          className="shadow appearance-none border rounded
         text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 
          focus:shadow-outline focus:outline-none text-white 
          font-bold py-1 px-2 rounded"
          type="submit"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <br />
      {loading && <p>Loading results...</p>}
      {error && <p>{error}</p>}
      {results.map((show) => (
        <div key={show.id}>
          <Link to={`/detail/${show.id}`}>
            <h2 className="text-3xl">{show.name}</h2>
          </Link>
          {show.image && <img src={show.image.medium} alt={show.name} />}
        </div>
      ))}
    </div>
  );
}

export default SearchView;
