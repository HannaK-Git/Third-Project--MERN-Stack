
import {useForm} from 'react-hook-form'
import './login.css'
import utils from '../utils';
import {useState } from 'react'
import PropTypes from 'prop-types';
import ErrorNotice from '../ErrorNotice';




function LoginComp ({setToken})  {
  const { register, handleSubmit, formState: {errors} } = useForm({userName :'', password : ''});
  
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: 'Could Not Log In'
  });

  const onSubmit = async (obj) => {
 
    setError({ ...error, show: false });
    setLoading(true);
    try {
      const data = await utils.loginUser( obj);
   
      console.log(data);

      if (!data.token) {
        handelError();
        return;
      }

      setToken(data);
    } catch (err) {
      handelError();
    }
  };

  const handelError = () => {
    alert('Data is not valid');
    setError({ ...error, show: true });
    setLoading(false);
  };

   
    return (<div>

<h2 style={{textAlign: "center"}}>Please Log In</h2>
<div className="containerLog">
<form onSubmit={handleSubmit(onSubmit)}>
  <label> User Name : </label>
    <input className="loginInput" {...register('userName', {required: true})} placeholder="User Name" name="userName" /> <br/>
   {errors.userName && <p style={{color: "red"}}>User name is required.</p>}
   <label> Password : &nbsp; </label> 
   <input className="loginInput" {...register('password', {required: true})} placeholder="Password" name="password" /> <br/>
   {errors.password && <p style={{color: "red"}}>Password is required.</p>}
   <input className="buttonLog" type="submit" value="Login" /> <br/>

   
<table className="styleTable" border="1">
  <tr><th>User Name</th><th>Password</th></tr>
  
  <tr><td>User1</td><td>123</td></tr>
  <tr><td>User2</td><td>456</td></tr>
  <tr><td>User3</td><td>789</td></tr>

</table>
</form>
</div>

    </div>)
}

LoginComp.propTypes = {
  setToken: PropTypes.func
};
export default LoginComp;