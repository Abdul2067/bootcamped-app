import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Companies from './pages/Companies/Companies'
import CreateCompany from './pages/Companies/CreateCompany'
import CompanyDetail from './pages/Companies/CompanyDetail'
import Listings from './pages/Listings/Listings'
import CreateListing from './pages/Listings/CreateListing'
import ListingDetail from './pages/Listings/ListingDetail' 
import EditListing from './pages/Listings/EditListing'


// import Profiles from './pages/Profiles/Profiles'
import * as authService from './services/authService'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [listings, setListings] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleDeletePost = async (postId) => {
    try {
      await handleDeletePost(postId)
      setListings(listings.filter((post) => post._id !== postId))
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        {/* <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/companies"
          element={<Companies user={user}/>}
        />
        <Route
          path="/companies/create"
          element={user ? <CreateCompany user={user} /> : <Navigate to="/signin" />}
        />
        <Route
          path="/companies/:id"
          element={<CompanyDetail user={user}/>}
        />
        <Route
          path="/listings"
          element={<Listings user={user} />}
        />
        <Route
          path="/listings/create"
          element={<CreateListing user={user}  />}
        />
        <Route
          path="/listings/:id"
          element={<ListingDetail user={user} handleDeletePost={handleDeletePost} />}
        />
        <Route
          path="/listings/:id/edit"
          element={<EditListing user={user} />}
        />
      </Routes>
    </>
  )
}

export default App
