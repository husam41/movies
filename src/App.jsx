import './css/App.css'
import Home from './pages/home';
import Favorites from './pages/Favorites';
import {Routes,Route} from"react-router-dom";
import NavBar from './components/NavBar';
function App() {
  return (
   <div>
      <NavBar/>
     <main className='main-content'>
     <Routes>
        <Route path='/' element={<Home />}/>
         <Route path='/Favorites' element={<Favorites />}/>
      </Routes>
     </main>
     </div>
    );
}
 

export default App
   