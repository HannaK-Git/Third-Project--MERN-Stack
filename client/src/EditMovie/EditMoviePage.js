import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import './editMovie.css'

const EditMoviePageComp = (props) => {

    let history = useHistory();
    const [movie, setMovie] = useState({name: '',  genres: '', image: '', yearPremiered: 0});


useEffect(async() => {
  let resp = await axios.get("http://localhost:8000/api/movies/" + props.match.params.id );
  setMovie(resp.data);
}, [])


  const updateMovie = async() =>
{
  let resp = await axios.put("http://localhost:8000/api/movies/" + props.match.params.id, movie);
  alert(resp.data);
  props.history.push("/home/allmovies")
   
}

const backToMovies = () =>
{
  history.push("/home/allmovies");
}

    return (
        <div>
           <h2>Edit Movie : {movie.name}</h2>

           <div className="containerEditMovie">
          
      <label >Name: </label>
       <input value={movie.name} type="text"  onChange={e => setMovie({...movie, name: e.target.value})
      } /> <br/>

       <label >Generes: </label>
      <input value={movie.genres} type="text"  onChange={e => setMovie({...movie, genres: e.target.value})}/> <br/>

      <label >Image URL: </label>
        <input value={movie.image} type="text"  onChange={e => setMovie({...movie, image : e.target.value})}/> <br/>

        <label>Premiered: </label> 
          <input type="number" value={movie.yearPremiered}  onChange={e => setMovie({...movie, yearPremiered : e.target.value})} /> <br/>

      <button className="buttonEdit buttonGreenEdit" onClick={updateMovie}>Save</button>
      <button className="buttonEdit buttonGreenEdit" onClick={backToMovies}>Cancel</button>
      
      </div>
        </div>
    )
}

export default EditMoviePageComp
