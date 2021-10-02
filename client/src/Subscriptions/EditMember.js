import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import './subscription.css'

const EditMemberComp= (props) => {


    let history = useHistory();
    const [member, setMember] = useState({fullName: '', email: '', city: ''});

    useEffect(async() => {
        let resp = await axios.get("http://localhost:8000/api/member/" + props.match.params.id );
        setMember(resp.data);
      }, []);

      const updateMember = async() =>
{
  let resp = await axios.put("http://localhost:8000/api/member/" + props.match.params.id, member);
  alert(resp.data);
  history.push('/subscription/allmembers');
   
}

const backToMembers = () =>
{
  history.push('/subscription/allmembers');
}

    return (
        <div>
            <h2>Edit Movie : {member.fullName} </h2>

<div className="containerEditMember">

<label >Name: </label>
<input value={member.fullName} type="text"  onChange={e => setMember({...member, fullName: e.target.value})
} /> <br/>

<label >Email: </label>
<input value={member.email} type="text"  onChange={e => setMember({...member, email: e.target.value})}/> <br/>

<label >City: </label>
<input value={member.city} type="text"  onChange={e => setMember({...member, city : e.target.value})}/> <br/>



<button className="buttonEdit buttonGreenEdit" onClick={updateMember}>Save</button>
<button className="buttonEdit buttonGreenEdit" onClick={backToMembers}>Cancel</button>

</div>
        </div>
    )
}

export default EditMemberComp
