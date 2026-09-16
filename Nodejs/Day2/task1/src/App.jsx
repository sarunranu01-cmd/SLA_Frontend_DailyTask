import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Button1 from './Button1'
import Box from './Box'
import Card from './Card'
import './Card.css'


const App=()=>{
  return <>
  <div>
    <Button1/>
    <Card />
      <Box />
  </div>
  </>
}
export default App