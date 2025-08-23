import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Adventure from './Adventure'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Adventure></Adventure>
    </>
  )
}

export default App
