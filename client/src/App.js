
import './App.css';
import LoginComp from './LoginPage/Login';
import MainComp from './mainPage/main';
import useToken from './useToken';





function App() {
  
  const { token, setToken } = useToken();

  if (!token) {
    console.log('token is null: ', token);
    return <LoginComp setToken={setToken} />;
  }
 
  return (
    <div >
      
      <MainComp />
      
      
    </div>
  );
}

export default App;
