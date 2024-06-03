import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import OnlineBanking from '../pages/onlineBanking_Page/onlineBanking';


function PrivateRoute() {
  const {currentUser} = useSelector(state => state.user);

  return currentUser ? <Outlet /> : <Navigate to='/online-banking'/>
}

export default PrivateRoute