import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { getSmoke } from "@/api/smoke";


function App() {
  const [count, setCount] = useState(0)
  const [smoke, setSmoke] = useState<string | null>(null);

  useEffect(() => {
    getSmoke()
      .then(setSmoke)
      .catch(err => {
        console.error("Smoke API failed:", err);
        setSmoke("API Error");
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}> count is {count} </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       <div className="text-center text-lg font-semibold">
      Backend says: {smoke ?? "Loading..."}
    </div>
    </>
  )
}

export default App
