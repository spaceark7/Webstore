import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Footer from './Components/Footer.js'
import Navigation from './Components/Navigation.js'
import HomePage from './Components/HomePage/HomePage'

function App() {
  return (
    <div className='App'>
      <Navigation />
      <main className="h-100">
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
