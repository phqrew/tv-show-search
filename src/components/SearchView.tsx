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
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">TV Show Search</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <input
            className="border border-gray-400 px-4 py-2 w-2/4 mb-2"
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
      {loading ? (
        <>
          <svg
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span>Your connection is slow. Loading results...</span>
        </>
      ) : null}
      {error && <p>{error}</p>}
      <div className="container px-5 py-4 flex flex-wrap">
        {results.map((show) =>
          show.image ? (
            <div className="h-full p-4 lg:w-1/3" key={show.id}>
              <Link to={`/detail/${show.id}`}>
                <h2 className="text-l font-bold">{show.name}</h2>
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
