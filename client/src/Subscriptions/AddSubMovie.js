import React from 'react'
import './subscription.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import videoIcon from './video-icon.jpg'




const AddSubMovieComp = (props) => {

    const [addNewSub, setAddNewSub ] = useState({_id: '', data: new Date() })
    const [memberId, setMemberId] = useState();

useEffect(async()=>
{
    let resp = await axios.get("http://localhost:8000/api/member/" + props.memberId);
   setMemberId(resp.data);
   
}, [])

const addSub = async() =>
{
    let status = await axios.put("http://localhost:8000/api/member/movie/"+ props.memberId, addNewSub);
    alert(status.data);
    window.location.reload();
    await axios.put("http://localhost:8000/api/movies/member/" + addNewSub._id, memberId);
    
    
    
   
    
   
    
}

    return (
        <div className="wrappenForAddingNewSubMovie">
        <div className="addSubMovieMain">
 
            <h4 style={{paddingLeft: '50px', fontSize: '20px'}}>Add a new Movie</h4>
            <select className="inputForAddMovieSub" onChange={e => setAddNewSub({...addNewSub, _id: e.target.value}) }> 
            {
                 
                props.allMovies.map(item =>
                    {
                         return <option value={item._id} key={item._id} >{item.name} </option>
                    })
            }
            
            </select>  &nbsp;
            <input className="inputForAddMovieSub" style={{width:"40%"}} type="date" onChange={e => setAddNewSub({...addNewSub, data: e.target.value})} /> <br/>
            <button className="moviesWatchedButton button" onClick={addSub}>Subscribe</button>
           
            
            </div>
            <div> <img src={videoIcon} style={{paddingTop: '15px'}} /> </div>
        </div>
        
    )
}

export default AddSubMovieComp
