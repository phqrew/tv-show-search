import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
function DetailView() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        setError(
          "An error occurred while fetching show details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  if (loading) return <Loading />;
  if (error)
    return <p className="text-l text-gray-200 p-2 font-bold">{error}</p>;
  if (!show) return null;

  return (
    <div className="px-5 py-4 bg-gradient-to-b from-black to-red-900">
      <h1 className="text-3xl text-gray-200 mb-4">{show.name}</h1>
      {show.officialSite ? (
        <div className="mb-2">
          <span className="text-l text-gray-200 font-bold ">
            Official site:{" "}
          </span>
          <a className="text-l text-gray-200" href={show.officialSite}>
            {show.officialSite}
          </a>
        </div>
      ) : null}
      <div className="mb-2">
        <span className="text-l text-gray-200 font-bold ">
          Year of release: {show.premiered}
        </span>
      </div>
      <div
        className="text-l text-gray-200 mb-4"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      />
      <img className="" src={show.image.original} alt={show.name} />
    </div>
  );
}

export default DetailView;
