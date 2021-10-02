
import './Movies.css';
import {  Switch, NavLink, Route, useRouteMatch } from "react-router-dom"
import EditMoviePageComp from '../EditMovie/EditMoviePage';
import AllMoviesComp from '../AllMoviesPage/AllMovies'
import AddMovieComp from '../AddMovie/AddMovie';
import SingleMemberComp from '../SingleMember/SingleMember';

const MoviesPageComp = (props) => 
{
    const {path, url} = useRouteMatch();
    

    return(<div className="main">

<h3>Movies</h3>


<NavLink className="linkDecoration" activeStyle={{backgroundColor: "rgb(12, 240, 99)"}} to={`${url}/allmovies`}> All Movies</NavLink> &nbsp;
<NavLink className="linkDecoration" activeStyle={{fontWeight: "bold",backgroundColor: "rgb(12, 240, 99)"}} to={`${url}/add`}> Add Movie</NavLink>&nbsp;


       <Switch>
       <Route path={`${path}/allmovies`} component={AllMoviesComp} />
       <Route  path={`${path}/add`} component={AddMovieComp} />
       <Route  path={`${path}/edit/:id`} component={EditMoviePageComp} />
       <Route  path={`${path}/member/:id`} component={SingleMemberComp} />
       
       </Switch>


    </div>)
    
}

export default MoviesPageComp
