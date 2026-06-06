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
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2Q0NGRkNDc5MmE1NDU2MmM0NTYwNmRjMTM0MWE0MiIsIm5iZiI6MTc4MDU4NDA2OC4xOCwic3ViIjoiNmEyMThlODQzNWQwYTQ5ODRhMzM0NTllIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Qt5Z1ggTbWxuNDVdN-qSSyPUhKzIxC2ZtYws383KB0'
  }
};




const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY 
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel',handleWheel);
},[])

  return (
    <div className='title-cards'>
      
      <h2>{title? title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards

