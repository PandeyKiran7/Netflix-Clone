import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category ? category : "now_playing"
          }?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        setApiData(data.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    const cardsElement = cardsRef.current;
    cardsElement.addEventListener("wheel", handleWheel);

    return () => cardsElement.removeEventListener("wheel", handleWheel);
  }, [category]);

  return (
    <div className="titlecard">
      <h2 style={{ fontSize: 24 }}>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : "path/to/placeholder-image.jpg"
                }
                alt={card.original_title || "No Title Available"}
              />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
};

export default TitleCards;
