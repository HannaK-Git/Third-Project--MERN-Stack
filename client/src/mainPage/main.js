import { Switch, NavLink, Route } from "react-router-dom";
import MoviesPageComp from "../MoviesPage/moviesPage";
import SubscriptionComp from "../Subscriptions/Subscription";
import LoginComp from "../LoginPage/Login";
import useToken from "../useToken";
import './main.css'
import myFile from './PRS.pdf'
import { FontAwesome } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";






const MainComp = (props) => {

    const {fullName} = useToken();

    const logOut = () =>
    {
        localStorage.clear();
        window.location.reload();  
    }
    

    return (<div>
       
         
        <div className='wrapperForTitle'>
       <div> <h1 style={{textAlign: "center"}}>Movies - Subscriptions Web Site </h1></div>
       <div style={{textAlign: "center"}}> <a href={myFile} target="_blank" rel='noreferrer' className="linkPDF">  
        &#8594; Project requirements specification (.pdf) &#8592;  </a></div>
        </div>
        
        <div className="mainNavLinks">
        <div>
          <NavLink className="linkDecoration"  to="/home" activeStyle={{fontWeight: "bold",textDecorationLine: "underline"}}>Movies </NavLink>&nbsp; 
          </div>
          <div>
         <NavLink className="linkDecoration" activeStyle={{fontWeight: "bold",textDecorationLine: "underline"}} to="/subscription">Subscriptions</NavLink>&nbsp; 
         </div>
         
         <div>
         <NavLink className="linkDecoration" activeStyle={{fontWeight: "bold",textDecorationLine: "underline"}} onClick={logOut} to="/login">Log Out</NavLink>&nbsp; 
         </div>
         <div>
          {fullName} <FaUserTie fontSize='25px' />
         </div>

        </div>
        
        <Switch>
            <Route path="/home" component={MoviesPageComp}/>
            <Route path="/login" component={LoginComp} />
            <Route path="/subscription" component={SubscriptionComp} />
        </Switch> 
        
       
    </div>)
}

export default MainComp