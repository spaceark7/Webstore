import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Footer from './Components/Footer.js'
import Navigation from './Components/Navigation.js'
import HomePage from './Components/Pages/HomePage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ProductPage from './Components/Pages/ProductPage'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <main className="h-100">
          <Container>
            <Route path='/' exact component={HomePage} />
            <Route path='/product/:id' component={ProductPage} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
