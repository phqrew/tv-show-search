import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return null;

  return (
    <div>
      <h1 className="text-3xl">{show.name}</h1>
      <br />
      <div dangerouslySetInnerHTML={{ __html: show.summary }} />
      <br />
      <img src={show.image.original} alt={show.name} />
    </div>
  );
}

export default DetailView;
