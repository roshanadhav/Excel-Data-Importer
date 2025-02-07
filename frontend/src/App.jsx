import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import AuthPage from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import Excel from './pages/Excel';
import DashbordPage from './pages/DashbordPage';
import AboutPage from './pages/AboutPage';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/excel' element={<Excel/>}/>
        <Route path='/login' element={<AuthPage/>}/>
        <Route path='/dashboard' element={<DashbordPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/verify-email' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App ;
