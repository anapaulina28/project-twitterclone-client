import './App.css'
import {Routes, Route} from 'react-router-dom'
import IsAnon from './components/isAnon'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Feed from './pages/Feed'
import IsPrivate from './components/isPrivate'
import SearchUsers from './pages/SearchUsers'
import TweetDetails from './pages/TweetDetails'
import EditTweet from './pages/EditTweet'

function App() {
  

  return (
   <div>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<IsAnon><SignUp/></IsAnon>}/>
       <Route path='/login' element={<IsAnon><Login/></IsAnon>}/>
       <Route path="/feed" element={<IsPrivate><Feed /></IsPrivate>}/>
       <Route path='/search' element={<IsPrivate><SearchUsers /></IsPrivate>}/>
       <Route path='/feed/:feedId' element={<IsPrivate><TweetDetails /></IsPrivate>}/>
       <Route path='/feed/:feedId/edit' element={<IsPrivate><EditTweet/></IsPrivate>}/>
    </Routes>
   </div>
  )
}

export default App
