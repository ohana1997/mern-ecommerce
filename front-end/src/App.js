import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Container } from "react-bootstrap"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import UserListPage from "./pages/ListUsersPage"
import UserEditPage from "./pages/UserEditPage"
import { BrowserRouter as Router, Route } from "react-router-dom"
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/admin/listuser" component={UserListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
