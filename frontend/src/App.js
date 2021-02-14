import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import Footer from './Components/Footer.js'
import Navigation from './Components/Navigation.js'
import HomePage from './Components/Pages/HomePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductPage from './Components/Pages/ProductPage'
import AddToCart from './Components/Pages/AddToCartPage.js'
import LoginPage from './Components/Pages/LoginPage.js'
import RegisterPage from './Components/Pages/RegisterPage.js'
import ProfilePage from './Components/Pages/ProfilePage.js'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <main className='h-100'>
          <Container>
            <Route path='/login' component={LoginPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/cart/:id?' component={AddToCart} />
            <Route path='/' exact component={HomePage} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
