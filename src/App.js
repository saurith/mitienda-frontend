import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/homePage';
import ListCliente from './components/cliente/listCliente';

import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <HomePage /> } />
      <Route path='/cliente' element={ <ListCliente />} />
    </Routes>
   
  );
}

export default App;
