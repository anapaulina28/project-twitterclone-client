import './App.css'
import {Routes, Route} from 'react-router-dom'
import IsAnon from './components/isAnon'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  

  return (
   <div>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<IsAnon><SignUp/></IsAnon>}/>
       <Route path='/login' element={<IsAnon><Login/></IsAnon>}/>
    </Routes>
   </div>
  )
}

export default App
