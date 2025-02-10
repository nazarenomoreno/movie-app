import {useState, useEffect} from 'react';
import './App.css';

import MovieList from './components/MovieList';
import Header from './components/Header';


function App() {

  
  const [movies, setMovies] = useState([])
  const [busqueda, setBusqueda] = useState('Star+Wars')
  const [favorites, setFavorites] = useState([
    {
      "Title": "Manchester by the Sea",
      "Year": "2016",
      "imdbID": "tt4034228",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg"
    },
    {
      "Title": "Jaws",
      "Year": "1975",
      "imdbID": "tt0073195",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYjViNDQzNmUtYzkxZi00NTk5LTljMmItYjJlZmZkODIxNjU1XkEyXkFqcGc@._V1_SX300.jpg"
    },
    {
      "Title": "El Camino",
      "Year": "2019",
      "imdbID": "tt9243946",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYTYxMjI2YzUtODQ5Mi00M2JmLTlmNzItOTlkM2MyM2ExM2RlXkEyXkFqcGc@._V1_SX300.jpg"
    }
  ])
  


  async function getMovieRequest(busqueda){


    const url = `https://www.omdbapi.com/?s=${busqueda}&apikey=5e56e43`


    try{
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);   // si la solicitud es falsa (no fue exitosa)
      //  throw interrumpe la ejecución del código y crea una nueva instancia de Error


      const data = await response.json();

      

      //console.log(data);    

      setMovies(data.Search || []);       //si es null, se seteará el estado con un array vacio
      
    }
    catch(error){
      console.error("Hubo un error en la solicitud:", error);
    }
  }
  


  useEffect(()=>{
    getMovieRequest(busqueda);
    console.log('nueva busqueda: ', busqueda)
  },[busqueda])
 





  function addMovie(props,index){       // al hacer click en una pelicula
    console.log(props.movies[index].Title)
    props.setFavorites([...props.favorites, props.movies[index]])    //traemos lo que ya tenemos y añadimos lo nuevo
    
  }


  function removeMovie(props, index){
    console.log(props.movies[index].Title)
    const newFavorites = props.movies.filter( (element, i) => i !== index );      //crea un nuevo array exepto la pelicula del index


    props.setFavorites(newFavorites);                //actualiza el estado con el nuevo array
  }




  return (
    <>
        <div className='contenedor-principal'>

            <Header  titulo={'Resultados (haz click para añadir a favoritas)'}  showInput={true} value={busqueda} setValue={setBusqueda}/>

            <div className='row'>
                <MovieList movies={movies} favorites={favorites} setFavorites={setFavorites} funcion={addMovie}/>
            </div>

            <Header  titulo={'Favoritas (haz click para eliminar de favoritas)'}  showInput={false} />

            <div className='row'>
                <MovieList movies={favorites} setFavorites={setFavorites} funcion={removeMovie}/>
            </div>
          
        </div>
    </>
  )
}

export default App
