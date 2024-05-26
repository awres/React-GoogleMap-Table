/**
 * Importowanie useState, logo React i logo Vite
 */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**
 * Komponent App jest głównym komponentem aplikacji
 * Używa useState do zarządzania stanem licznika
 */

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}

// Eksportuje komponent App
export default App
