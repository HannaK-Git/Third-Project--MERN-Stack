import './AddMovie.css'
import {useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import moviePicture from './movieProduction.png'

const AddMovieComp = () => {

  let history = useHistory();
  const [movie, setMovie] = useState({name: '', 
genres: '', image: '', premiered: 0
});



const saveMovie = async() =>
{
   let status = await axios.post("http://localhost:8000/api/movies", movie);
   
   alert(status.data);
   setMovie({name: '',  genres: '', image: '', yearPremiered: 0});
   
}

const backToMovies = () =>
{
  history.push("/home/allmovies");
}
  return(<div>
      <h3>Add New Movie: </h3>
    <div className='wrapperForAddingMovie'>
      <div className="container">
      <label >Name: </label>
       <input value={movie.name} type="text" placeholder="Name.." onChange={e => setMovie({...movie, name: e.target.value})
      } /> <br/>

       <label >Generes: </label>
      <input value={movie.genres} type="text" placeholder="Genre.." onChange={e => setMovie({...movie, genres: e.target.value})}/> <br/>

      <label >Image URL: </label>
        <input value={movie.image} type="text" placeholder="Image URL.." onChange={e => setMovie({...movie, image : e.target.value})}/> <br/>

        <label  >Premiered: </label>
          <input type="text" value={movie.yearPremiered} placeholder="Premiered.." onChange={e => setMovie({...movie, yearPremiered : e.target.value})} /> <br/>

      <button className="button buttonGreen" onClick={saveMovie}>Save</button>
      <button className="button buttonGreen" onClick={backToMovies}>Cancel</button>
      
      </div>
      <div> <img src={moviePicture} className='imageMovieStyle' alt='movieProduction' /> </div>
      </div>
  </div>)  
}

export default AddMovieComp