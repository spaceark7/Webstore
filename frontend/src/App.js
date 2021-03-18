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
import ShippingPage from './Components/Pages/ShippingPage.js'
import PaymentMethodPage from './Components/Pages/PaymentMethodPage.js'
import PlaceOrderPage from './Components/Pages/PlaceOrderPage.js'
import OrderPage from './Components/Pages/OrderPage.js'
import UserListPage from './Components/Pages/UsersLIstPage'
import UserEditPage from './Components/Pages/UserEditPage.js'
import ProductListPage from './Components/Pages/ProductListPage.js'
import ProductEditPage from './Components/Pages/ProductEditPage.js'
import OrderListPage from './Components/Pages/OrderListPage.js'
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
            <Route path='/shipping' component={ShippingPage} />
            <Route path='/payment' component={PaymentMethodPage} />
            <Route path='/placeorder' component={PlaceOrderPage} />
            <Route path='/orders/:id' component={OrderPage} />
            <Route path='/admin/userlist' component={UserListPage} />
            <Route path='/admin/user/:id?/edit' component={UserEditPage} />
            <Route path='/admin/productlist' component={ProductListPage} />
            <Route path='/admin/product/:id/edit' component={ProductEditPage} />
            <Route path='/admin/orderlist' component={OrderListPage} />
            <Route path='/' exact component={HomePage} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
