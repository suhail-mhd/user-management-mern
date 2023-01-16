import './App.css';
import Login from './Components/LoginPage/Login';
import SignUp from './Components/Signup/SignUp';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import HomePage from './Components/Homepage/HomePage';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminHomepage from './Components/AdminHomepage/AdminHomepage';
import AdminCreate from './Components/AdminCreate/AdminCreate'
import AdminUpdate from './Components/AdminUpdate/AdminUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/adminhomepage'  element={<AdminHomepage/>} />
          <Route path='/admincreate'  element={<AdminCreate/>} />
          <Route path='/adminupdate/:id' element={<AdminUpdate/>} />
          <Route path='/admin'  element={<AdminLogin/>} />
          <Route path='/signup'  element={<SignUp/>} />
          <Route path='/homepage'  element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
