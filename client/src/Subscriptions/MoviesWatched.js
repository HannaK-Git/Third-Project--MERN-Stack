import React from 'react'
import AddSubMovieComp from './AddSubMovie'
import './subscription.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesome } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";


const MoviesWatchedComp = (props) => {

    const [showSubMovie, setShowSubMovie] = useState(false);
    const [allmovies, setAllMovies] = useState();

    

    useEffect(async () => {
        let resp = await axios.get("http://localhost:8000/api/movies");
        setAllMovies(resp.data);
       
    
        }, [])

    const showAddSubMovie =() =>
        {
            setShowSubMovie(!showSubMovie);
        }
    return (
        
        <div className="moviesWatchedMain">
            <h3>Movies Watched</h3>
            


            <button onClick={showAddSubMovie} className="moviesWatchedButton button">Subscribe to a new Movie</button>
           
           {showSubMovie ? <AddSubMovieComp memberId={props.memberId} allMovies={allmovies} /> : " "} 
           <ul>
            {
               props.moviesWatched.map((item, index) =>
                {
                    
                   return <li key={index} style={{ fontSize : '20px', listStyleType: 'none'}}> < FaVideo/> {item.movieId.map((item2, index)=>
                   {
                       return <Link to={`movie/${item2._id}`} key ={index} > {item2.name}</Link>
                   })},  {moment(item.data).format("DD/MM/YYYY")} 
                    
                    </li>
                })
            }
            </ul>

        </div>
    )
}

export default MoviesWatchedComp
