import axios from 'axios';
import {useState, useEffect} from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import './AllMovies.css'
import SubWatchedComp from '../SubscrWatched/SubWatched';


const AllMoviesComp = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchResult, setSearchResult] = useState('');
    const {path, url} = useRouteMatch();
    
    useEffect(async () => {
    let resp = await axios.get("http://localhost:8000/api/movies");
    setMovies(resp.data);

    }, [])
    
const search = async() =>
{
    if(searchResult === "")
    {
        let resp = await axios.get("http://localhost:8000/api/movies");
        setMovies(resp.data);
    }
    else{
        let resp = await axios.get("http://localhost:8000/api/movies/search/" + searchResult);
        setMovies(resp.data);
    }
    
   
}

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


    return (<div >
        <div style={{paddingTop: "5px"}}>
       Find Movie: <input style={{height: '30px', width:'300px', borderRadius: '5px'}} type="text" placeholder="Search by name"  onChange={e => setSearchResult(e.target.value)}/> &nbsp; 
        <button className="button buttonGreen" onClick={search}>Find </button>
        </div>
{
     movies.map(item =>
     {
         return <div className="movieDiv" key={item._id}><p style={{fontWeight: 'bold', fontSize: '30px'}} > {item.name}, {item.yearPremiered}</p>
        <span style={{fontWeight: 'bold', fontSize: '20px'}}> Genres:  {item.genres.map(x =>  `"${x}"`).join(',')}</span> 
        
        <div className="wrapperDiv">
         
             <div className="imageStyle"> <img alt="moviePicture" style={{boxShadow: "5px 10px 18px #888888"}} src={item.image}/> </div>

             <div className="subscrDiv" > <SubWatchedComp moviesData={item.membersThatWatched} movieId={item._id} /></div>
          
          </div>


         <div className="buttonClass"> 
             <button className="button buttonGreen"> <Link style={{textDecoration: 'none', color: 'white'}} to={`edit/${item._id}`}>Edit</Link> </button>
             <button className="button buttonGreen" onClick={() => deleteMovie(item._id)}>Delete</button>
         </div>
         </div>
     })
}


    </div>) 
}

export default AllMoviesComp