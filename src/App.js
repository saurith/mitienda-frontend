import logo from './logo.svg';
import './App.css';
import HomePage from './components/home/homePage';
import ListCliente from './components/cliente/listCliente';

import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <ListCliente /> } />
      <Route path='/cliente' element={ <HomePage />} />
    </Routes>
   
  );
}

export default App;
