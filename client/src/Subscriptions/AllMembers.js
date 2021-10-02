import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './subscription.css'
import { Link, useRouteMatch } from 'react-router-dom';
import MoviesWatchedComp from './MoviesWatched';
import { FontAwesome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaCity } from "react-icons/fa";

const AllMembersComp = (props) => {

const [members, setMembers] = useState([]);
const {path, url} = useRouteMatch();

useEffect(async() => {
    let resp = await axios.get("http://localhost:8000/api/member")
    setMembers(resp.data);
}, [])

const deleteMember = async(id) =>
{
    let res = await axios.get("http://localhost:8000/api/member/" + id);
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
            { members.map(item =>
                {
                   return <div className="membersDiv" key={item._id}> <div className='nameDiv' >{item.fullName}</div>
                   <div className='emailAndCityDiv'>
                     <FaEnvelope/> Email: <span>{item.email}</span> <br/>
                     <FaCity /> City: <span>{item.city}</span> <br/>
                      </div>
                      <button className="button buttonGreen"><Link style={{textDecoration: 'none', color: 'white'}} to={`editmember/${item._id}`}>Edit</Link> </button>
                      <button className="button buttonGreen" onClick={() => deleteMember(item._id)} >Delete</button>
                      <div> <MoviesWatchedComp moviesWatched={item.moviesWatched} memberId={item._id} /> </div>
                   
                    </div>
                })}
        </div>
    )
}

export default AllMembersComp
