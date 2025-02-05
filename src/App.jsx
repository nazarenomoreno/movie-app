import {useState, useEffect} from 'react';
import './App.css';

import MovieList from './components/MovieList';


function App() {
  const [movies, setMovies] = useState([])
  


  async function getMovieRequest(){

    const url = 'http://www.omdbapi.com/?s=Star+Wars&apikey=5e56e43'


    try{
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);   // si la solicitud es falsa (no fue exitosa)
      //  throw interrumpe la ejecución del código y crea una nueva instancia de Error


      const data = await response.json();
      console.log(data);    
      setMovies(data.Search)      
    }
    catch{
      console.error("Hubo un error en la solicitud:", error);
    }
  }
  


  useEffect(()=>{
    getMovieRequest();
  },[])
 


  return (
    <>
        <div className='contenedor-principal'>

            <div className='row'>
                <MovieList movies={movies}/>
            </div>
          
        </div>
    </>
  )
}

export default App
