import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AdminRoute() {
  const {currentUser} = useSelector(state => state.user);

  return currentUser && (currentUser.role === 'admin') ? <Outlet /> : <Navigate to='/'/>
}

export default AdminRoute