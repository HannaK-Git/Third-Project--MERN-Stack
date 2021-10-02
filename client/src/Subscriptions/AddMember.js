import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import addMemberPicture from './addMemberPicture.png'
import './subscription.css'

const AddMemberComp = () => {


    let history = useHistory();
  const [member, setMember] = useState({fullName: '', 
email: '', city: ''});


const saveMember = async() =>
{
   let status = await axios.post("http://localhost:8000/api/member", member);
   alert(status.data);
   setMember({fullName: '', email: '', city: ''})
}

const backToAllMembers = () =>
{
    history.push('/subscription/allmembers');
}
    return (
        <div>
            <h2>Add member</h2>
            <div className="wrapperForAddMemberPictureAndForm" >
            <div className="containerForAddMember">
      <label >Full Name: </label>
       <input  type="text" value={member.fullName} placeholder="Full Name.." onChange={e => setMember({...member, fullName: e.target.value})
      } /> <br/>

       <label >Email: </label>
      <input  type="text" value={member.email} placeholder="Email.." onChange={e => setMember({...member, email: e.target.value})}/> <br/>

      <label >City: </label>
        <input  type="text" value={member.city} placeholder="City.." onChange={e => setMember({...member, city : e.target.value})}/> <br/>

        

      <button className="button buttonGreen" onClick={saveMember}>Save</button>
      <button className="button buttonGreen" onClick={backToAllMembers}>Cancel</button>
      
      </div>
      <div></div>
      <div> <img src={addMemberPicture} className='imageForAddingMember' /> </div>
      </div>
        </div>
    )
}

export default AddMemberComp
