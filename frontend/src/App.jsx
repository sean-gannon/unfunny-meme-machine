import { useState } from 'react'
import './App.css'
import HealthCheck from './components/HealthCheck'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
          <HealthCheck />
      </div>
    </>
  )
}

export default App
