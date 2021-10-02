
import {  Switch, NavLink, Route, useRouteMatch } from "react-router-dom"
import AllMembersComp from "./AllMembers";
import AddMemberComp from "./AddMember";
import './subscription.css'
import EditMemberComp from "./EditMember";
import SingleMovieComp from "../SingleMovie/SingleMovie";

const SubscriptionComp = () => {
     
    const {path, url} = useRouteMatch();
    return(<div className="subscriptionsDiv"> 
       <h2 style={{textAlign: 'center' }}>Subscriptions</h2>
    <NavLink className="linkDecoration" activeStyle={{fontWeight: "bold",backgroundColor: "rgb(12, 240, 99)"}} to={`${url}/allmembers`}> All Members</NavLink> &nbsp;
    <NavLink className="linkDecoration" activeStyle={{fontWeight: "bold",backgroundColor: "rgb(12, 240, 99)"}} to={`${url}/addmember`}> Add Members</NavLink>&nbsp;


       <Switch>
       <Route  path={`${path}/allmembers`} component={AllMembersComp} />
       <Route  path={`${path}/addmember`} component={AddMemberComp} />
       <Route  path={`${path}/editmember/:id`} component={EditMemberComp} />
       <Route  path={`${path}/movie/:id`} component={SingleMovieComp} />
       </Switch>
    </div>)
}

export default SubscriptionComp 