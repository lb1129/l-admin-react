import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Button } from 'antd'
import 'antd/dist/reset.css'

function App() {
  return (
    <div className="app">
      <Button type="primary">Button</Button>
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
