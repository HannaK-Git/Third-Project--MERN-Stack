import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './singleMember.css'
import { Link, useRouteMatch } from 'react-router-dom';

import MoviesWatchedComp from '../Subscriptions/MoviesWatched'
import { FontAwesome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const SingleMemberComp = (props) => {

    
        const [member, setMember] = useState([]);
        const [moviesWatched, setMoviesWatched] = useState([{movieId: [], data: ''}])
        const {path, url} = useRouteMatch();
        
        useEffect(async() => {
            let resp = await axios.get("http://localhost:8000/api/member/" + props.match.params.id)
           
            setMember(resp.data);
            setMoviesWatched(resp.data.moviesWatched);
           
        }, [])
        
        const deleteMember = async(id) =>
        {
            let res = await axios.get("http://localhost:8000/api/member/" + props._id);
        let member = res.data;
        console.log(member)
        let memberWithMovie = member.moviesWatched.map(x => x.movieId);
        console.log(memberWithMovie)
        for(let key of memberWithMovie)
        { 
            let res2 = await axios.get("http://localhost:8000/api/movies/" + key);
            let movies = res2.data;
          
         await axios.put("http://localhost:8000/api/movies/deleteMember/"+ movies._id, member);
        
        }
        let status = await axios.delete("http://localhost:8000/api/member/" + id);
            alert(status.data);
            window.location.reload();

    }

    return (
        <div className="wrapperForAllMembers">
           
             <div className="membersDiv" > <div className='nameDiv' >{member.fullName}</div> 
                    <div className='emailAndCityDiv'>
                     <FaEnvelope/> Email: <span>{member.email}</span> <br/>
                     <FaCity /> City: <span>{member.city}</span> <br/>
                      </div>
                      
                      <button className="button buttonGreen"><Link style={{textDecoration: 'none', color: 'white'}} to={`/subscription/editmember/${member._id}`} >Edit</Link> </button>
                      
                       <button className="button buttonGreen" onClick={() => deleteMember(member._id)} >Delete</button>
                      <div> <MoviesWatchedComp moviesWatched={moviesWatched} memberId={member._id} /> </div> 
                      
                   
                     </div> 
                
        </div>
    )
}

export default SingleMemberComp
