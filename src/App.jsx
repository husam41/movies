import Home from './components/Home';
import Favorites from './components/Favorites';
import {Routes,Route} from"react-router-dom";
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';

function App() {
   const [favorites, setFavorites] = useState([]);
   const [filter, setFilter] = useState('popular');

   useEffect(() => {
      try {
         const stored = localStorage.getItem('favorites');
         if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
         console.log('Failed to read favorites from localStorage', e);
      }
   }, []);

   useEffect(() => {
      try {
         localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (e) {
         console.log('Failed to save favorites to localStorage', e);
      }
   }, [favorites]);

   const toggleFavorite = (movie) => {
      setFavorites((prev) => {
         const exists = prev.find((m) => m.id === movie.id);
         if (exists) return prev.filter((m) => m.id !== movie.id);
         return [...prev, movie];
      });
   };

     return (
      <div className="min-h-screen flex flex-col">
         <NavBar />
        <main className='flex-1 p-8 box-border w-full flex flex-col'>
        <Routes>
           <Route path='/' element={<Home favorites={favorites} toggleFavorite={toggleFavorite} filter={filter} setFilter={setFilter} />} />
            <Route path='/favorites' element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
         </Routes>
        </main>
        </div>
       );
}


export default App
