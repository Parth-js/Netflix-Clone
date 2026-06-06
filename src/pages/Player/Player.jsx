import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}=useParams();

  const navigate = useNavigate();

  const [apiData , setApiData]= useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  });

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2Q0NGRkNDc5MmE1NDU2MmM0NTYwNmRjMTM0MWE0MiIsIm5iZiI6MTc4MDU4NDA2OC4xOCwic3ViIjoiNmEyMThlODQzNWQwYTQ5ODRhMzM0NTllIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Qt5Z1ggTbWxuNDVdN-qSSyPUhKzIxC2ZtYws383KB0'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

},[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowFullScreen></iframe>
      <player-info>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </player-info>
    </div>
  )
}

export default Player
