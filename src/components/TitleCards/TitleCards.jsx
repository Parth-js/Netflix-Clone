import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {


  const [apiData , setApiData ]= useState([]);
  const cardsRef = useRef();

  // form the TMDB
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
  }
};




const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY 
}

useEffect(() => {

  fetch(
    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${
      category ? category : "now_playing"
    }?language=en-US&page=1`,
    options
  )
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setApiData(res.results);
    })
    .catch(err => console.error(err));

  cardsRef.current.addEventListener("wheel", handleWheel);

  return () => {
    cardsRef.current?.removeEventListener("wheel", handleWheel);
  };

}, [category]);

  return (
    <div className='title-cards'>
      
      <h2>{title? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
  src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${card.backdrop_path}`}
  alt={card.original_title}
/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

