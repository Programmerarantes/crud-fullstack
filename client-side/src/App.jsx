import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserTable from './components/UserTable'
import CreateUser from './components/CreateUser'
//import UpdateUser from './components/UpdateUser'
//import Nav from './components/Nav'
//<Route path='/update/:id' element={<UpdateUser/>}></Route>

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserTable/>}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App