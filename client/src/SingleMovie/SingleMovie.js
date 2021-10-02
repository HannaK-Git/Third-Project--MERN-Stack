import React from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
// import './AllMovies.css'
import SubWatchedComp from '../SubscrWatched/SubWatched';
import './singlemovie.css'

const SingleMovieComp = (props) => {

    const [movie, setMovie] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchResult, setSearchResult] = useState('');
    const {path, url} = useRouteMatch();
    
    useEffect(async () => {
    let resp = await axios.get("http://localhost:8000/api/movies/" + props.match.params.id);
    setMovie(resp.data);
    setMembers(resp.data.membersThatWatched)

    }, [])
    

const deleteMovie = async(id) =>
{
    let res = await axios.get("http://localhost:8000/api/movies/" + id);
    let movie = res.data;
    for(let key of movie.membersThatWatched)
    { 
        let res2 = await axios.get("http://localhost:8000/api/member/" + key);
        let member = res2.data;
      
     await axios.put("http://localhost:8000/api/member/deleteMovie/"+ member._id, movie);
    
    }
        let status = await axios.delete("http://localhost:8000/api/movies/" + id);
    alert(status.data);
    window.location.reload();

}



    return (
        <div>
            <div className="movieDiv" ><p style={{fontWeight: 'bold', fontSize: '30px'}} > {movie.name}, {movie.yearPremiered}</p>
        <span style={{fontWeight: 'bold', fontSize: '20px'}}> Genres:  { 
        movie.genres ? 
        
            movie.genres.map(x =>  `"${x}"`).join(',') : false }</span> 
        
       
        
        <div className="wrapperDiv">
         
             <div className="imageStyle"> <img alt="moviePicture" style={{boxShadow: "5px 10px 18px #888888"}} src={movie.image}/> </div>

             <div className="subscrDiv" > <SubWatchedComp moviesData={members} movieId={movie._id} /></div>
          
          </div>


         <div className="buttonClass"> 
             <button className="button buttonGreen"> <Link style={{textDecoration: 'none', color: 'white'}} to={`/home/edit/${movie._id}`}>Edit</Link> </button>
             <button className="button buttonGreen" onClick={() => deleteMovie(movie._id)}>Delete</button>
         </div>
         </div>
        </div>
    )
}

export default SingleMovieComp
