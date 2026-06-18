// import React, { useEffect, useState } from "react";
// import "./Player.css";
// import back_arrow_icon from "../../assets/back_arrow_icon.png";
// import { useNavigate, useParams } from "react-router-dom";

// const Player = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [apiData, setApiData] = useState(null);

//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
//     },
//   };

//   // useEffect(() => {
//   //   fetch(
//   //     `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
//   //     options
//   //   )
//   //     .then((res) => res.json())
//   //     .then((res) => {
//   //       if (res.results && res.results.length > 0) {
//   //         setApiData(res.results[0]);
//   //       }
//   //     })
//   //     .catch((err) => console.error(err));
//   // }, [id]);

//   useEffect(() => {
//   fetch(
//     `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
//     options
//   )
//     .then((res) => res.json())
//     .then((res) => {
//       if (!res.results || res.results.length === 0) return;

//       // only official YouTube trailer
//       const trailer = res.results.find(
//         (vid) =>
//           vid.site === "YouTube" &&
//           vid.type === "Trailer"
//       );

//       // fallback if no trailer found
//       setApiData(trailer || res.results[0]);
//     })
//     .catch((err) => console.error(err));
// }, [id]);

//   return (
//     <div className="player">
//       <img
//         src={back_arrow_icon}
//         alt="back"
//         onClick={() => navigate(-2)}
//       />

//       {/* {apiData ? (
//         <>
//           <iframe
//             width="90%"
//             height="90%"
//             src={`${import.meta.env.VITE_YOUTUBE_EMBED_URL}/${apiData.key}`}
//             frameBorder="0"
//             allowFullScreen
//             title="trailer"
//           ></iframe> */}

//         {apiData?.key && (
        
//   <iframe
//     width="90%"
//     height="90%"
//     src={`${import.meta.env.VITE_YOUTUBE_EMBED_URL}/${apiData.key}`}
//     frameBorder="0"
//     allowFullScreen
//     title="trailer"
//   />

  
// )}

// {!apiData?.key && (
//   <h2 style={{ color: "white" }}>
//     No trailer available for this movie
//   </h2>
// )}
//           <player-info>
//             <p>{apiData.published_at?.slice(0, 10)}</p>
//             <p>{apiData.name}</p>
//             <p>{apiData.type}</p>
//           </player-info>
//         </>
//       ) : (
//         <p style={{ color: "white" }}>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Player;

import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (!res.results || res.results.length === 0) return;

        // 🎯 pick best trailer
        const trailer = res.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );

        setApiData(trailer || res.results[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      {/* Back button */}
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => navigate("/")}
      />

      {/* Video */}
      {apiData?.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`${import.meta.env.VITE_YOUTUBE_EMBED_URL}/${apiData.key}`}
          frameBorder="0"
          allowFullScreen
          title="trailer"
        />
      ) : (
        <h2 style={{ color: "white" }}>
          No trailer available for this movie
        </h2>
      )}

      {/* Info section */}
      {apiData && (
        <player-info>
          <p>{apiData.published_at?.slice(0, 10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </player-info>
      )}
    </div>
  );
};

export default Player;