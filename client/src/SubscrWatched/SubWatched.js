import React from 'react'
import './SubWatched.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesome } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";



const SubWatchedComp = (props) => {




    return (
        <div className="subWatchMain">
            <div className="headerSub">
            Subscriptions Watched
            </div>
            <div >
            <ul >
            {
                props.moviesData.map((item, index) =>
                { 
                   return <li style={{ fontSize : '20px', listStyleType: 'none'}} key={index}> 
                   <Link style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}} to={`member/${item._id}`}> 
                       <FaUserAlt fontSize='20px'/> {item.fullName}, 
                       </Link>  

                   {item.moviesWatched.filter(x => x.movieId == props.movieId).map((item2, index2) =>
                   {
                       return <span style={{fontWeight : 'normal', fontSize : '15px'}} key={index2}>{moment(item2.data).format("DD/MM/YYYY")}</span> 
                   })}
                   </li>
                    
                   })
            }
            </ul>
            </div>
        </div>
    )
}

export default SubWatchedComp
