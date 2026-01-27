import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bill from './components/Bill'
import BillForm from './components/BillForm'

function App() {
    return (
      <div>
        <BillForm />
        {/* <Bill /> */}
      </div>
    )
}

export default App
