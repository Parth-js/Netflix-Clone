
import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
          options
        );

        const data = await response.json();

        console.log("TMDB Videos:", data);

        if (!data.results || data.results.length === 0) {
          setLoading(false);
          return;
        }

        // Find official YouTube trailer
        const trailer = data.results.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        setApiData(trailer || data.results[0]);
      } catch (error) {
        console.error("Trailer Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [id]);

  return (
    <div className="player">
      {/* Back Button */}
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-btn"
        onClick={() => navigate("/")}
      />

      {/* Loading */}
      {loading && (
        <p style={{ color: "white" }}>Loading Trailer...</p>
      )}

      {/* Trailer */}
      {!loading && apiData?.key && (
        <>
          <iframe
            width="90%"
            height="500"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      )}

      {/* No Trailer */}
      {!loading && !apiData?.key && (
        <h2 style={{ color: "white" }}>
          No trailer available for this movie
        </h2>
      )}
    </div>
  );
};

export default Player;