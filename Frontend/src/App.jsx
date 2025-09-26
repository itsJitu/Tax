import { useState } from 'react'
import Tax from './Component/tax';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Tax />

    </>
  )
}

export default App
