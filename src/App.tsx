import { useState } from 'react'
import './App.css'
import Header from './header';
import Hero from './Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


    <Header />
    <Hero />
    </>
  )
}

export default App
