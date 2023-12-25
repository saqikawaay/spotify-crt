import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import WebPlayer from './components/WebPlayer';



function App() {
  //const [count, setCount] = useState(0)
   const [token, setToken] = useState('');

  useEffect(() => {

    async function fetchToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }
    fetchToken();
    console.log(token); 
  }, []);
  
  
  return (
    <>
     { (token === '') ? <Login /> : <WebPlayer token={token} /> }
      
    </>
  )
}

export default App
