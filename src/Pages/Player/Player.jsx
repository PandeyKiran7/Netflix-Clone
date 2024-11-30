import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`, // Use environment variable for security
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results?.[0] || {})) // Add fallback for results
      .catch((err) => console.error(err));
  }, [id]); // Include `id` in the dependency array

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Go Back" onClick={ () => navigate(-2)} />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name || "Trailer"}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10) || "N/A"}</p>
        <p>{apiData.name || "No title available"}</p>
        <p>{apiData.type || "No type available"}</p>
      </div>
    </div>
  );
};

export default Player;
