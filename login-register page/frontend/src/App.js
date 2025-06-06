import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SignUp from './signupPage';
import LogIn from './loginPage';
import Home from './home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< SignUp />}></Route>
        <Route path='/login' element={< LogIn />}></Route>
        <Route path='/home' element={< Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
