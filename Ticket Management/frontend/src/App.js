import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './details';
import Update from './update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Details />}></Route>
        <Route path='/edit/:id' element={<Update />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
