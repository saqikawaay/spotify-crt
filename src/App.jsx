import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  /*  const [token, setToken] = useState('');

  useEffect(() => {

    async function fetchToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }
    getToken();
    console.log(token); 
  }, []);
  
  */
  return (
    <>
      <div>
        
          <img src='src/assets/spotify-crt.jpg' className="logo" alt="Vite logo" />
      </div>
      <h1>Spotify CRT</h1>
      <h3>for that lo-fi vibe.</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Login {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
